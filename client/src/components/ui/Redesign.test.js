import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import reducers from '../../reducers';
import Navbar from '../layout/Navbar';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Login from '../auth/Login';
import Register from '../auth/Register';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';

jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn(), defaults: { headers: { common: {} } } }));
jest.mock('uuid', () => ({ v4: () => 'test-alert' }));
const user = { _id: 'u1', name: 'Test Developer', avatar: '/test.png' };
const profile = { _id: 'profile', user, status: 'Developer', skills: ['React'], bio: 'Building useful things', experience: [], education: [], social: {} };
const post = { _id: 'p1', user: 'u1', name: 'Test Developer', text: 'First post', avatar: '/test.png', date: '2026-01-01', likes: [], comments: [] };
const anonymous = { user: null, isAuthenticated: false, loading: false, token: null };
function mount(component, path = '/', authenticated = true, route = '*') {
  const store = createStore(reducers, { auth: authenticated ? { user, isAuthenticated: true, loading: false, token: 'test' } : anonymous }, applyMiddleware(thunk));
  const view = render(<Provider store={store}><MemoryRouter initialEntries={[path]}><Routes><Route path={route} element={component} /></Routes></MemoryRouter></Provider>);
  return { ...view, store };
}
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  axios.get.mockResolvedValue({ data: user });
});
afterEach(cleanup);
test('theme toggle persists and account menu logs out through existing actions', () => {
  const { store } = mount(<Navbar />);
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(localStorage.getItem('devconnector-theme')).toBe('dark');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation' }));
  expect(screen.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByLabelText('Account menu'));
  fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
  expect(store.getState().auth.isAuthenticated).toBe(false);
  expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
});
test('directory filters real returned profiles and displays no-result state', async () => {
  axios.get.mockResolvedValue({ data: [profile, { ...profile, _id: 'p2', user: { ...user, _id: 'u2', name: 'Other Developer' }, skills: ['Python'] }] });
  mount(<Profiles />, '/profiles');
  await screen.findByText('2 developers in the community');
  fireEvent.change(screen.getByLabelText('Filter by skill'), { target: { value: 'Python' } });
  expect(screen.queryByRole('heading', { name: 'Test Developer' })).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Filter developers'), { target: { value: 'no-match' } });
  expect(screen.getByText('No developers found')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('/api/profile');
});
test('public profile route still loads the same API and all sections', async () => {
  axios.get.mockResolvedValue({ data: profile });
  mount(<Profile />, '/profile/u1', true, '/profile/:id');
  await screen.findByRole('heading', { name: 'Test Developer' });
  expect(axios.get).toHaveBeenCalledWith('/api/profile/user/u1');
  expect(screen.getByText('Building useful things')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Edit Profile' })).toHaveAttribute('href', '/edit-profile');
  expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
});
test('feed can submit, like, unlike and delete using unchanged API calls', async () => {
  axios.get.mockResolvedValue({ data: [post] });
  axios.post.mockResolvedValue({ data: { ...post, _id: 'p2', text: 'New post' } });
  axios.put.mockResolvedValueOnce({ data: [{ user: 'u1' }] }).mockResolvedValueOnce({ data: [] });
  axios.delete.mockResolvedValue({ data: { msg: 'Post removed' } });
  mount(<Posts />, '/posts');
  await screen.findByText('First post');
  fireEvent.click(screen.getByRole('button', { name: 'Like post' }));
  await screen.findByRole('button', { name: 'Unlike post' });
  expect(axios.put).toHaveBeenCalledWith('/api/posts/like/p1');
  fireEvent.click(screen.getByRole('button', { name: 'Unlike post' }));
  await screen.findByRole('button', { name: 'Like post' });
  expect(axios.put).toHaveBeenCalledWith('/api/posts/unlike/p1');
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New post' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  await screen.findByText('New post');
  expect(axios.post).toHaveBeenCalledWith('/api/posts', { text: 'New post' });
  fireEvent.click(screen.getAllByRole('button', { name: 'Delete post' })[0]);
  await waitFor(() => expect(screen.queryByText('New post')).not.toBeInTheDocument());
});
test('discussion adds and deletes comments with ownership controls', async () => {
  axios.get.mockResolvedValue({ data: post });
  axios.post.mockResolvedValue({ data: [{ ...post, _id: 'c1', text: 'A reply' }] });
  axios.delete.mockResolvedValue({ data: [] });
  mount(<Post />, '/posts/p1', true, '/posts/:id');
  await screen.findByText('First post');
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'A reply' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  await screen.findByText('A reply');
  expect(axios.post).toHaveBeenCalledWith('/api/posts/comment/p1', { text: 'A reply' });
  fireEvent.click(screen.getByRole('button', { name: 'Delete comment' }));
  await waitFor(() => expect(screen.queryByText('A reply')).not.toBeInTheDocument());
  expect(axios.delete).toHaveBeenCalledWith('/api/posts/comment/p1/c1');
});
test('login sends original credentials contract', async () => {
  axios.post.mockResolvedValue({ data: { token: 'test' } });
  const { container } = mount(<Login />, '/login', false);
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testing123' } });
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/auth', JSON.stringify({ email: 'test@example.com', password: 'testing123' }), expect.any(Object)));
});
test('registration retains password confirmation and request format', async () => {
  axios.post.mockResolvedValue({ data: { token: 'test' } });
  const { container } = mount(<Register />, '/register', false);
  for (const [label, value] of [['Name','New Developer'],['Email address','new@example.com'],['Password','testing123'],['Confirm password','wrong']]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
  fireEvent.submit(container.querySelector('form'));
  expect(axios.post).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'testing123' } });
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/users', JSON.stringify({ name: 'New Developer', email: 'new@example.com', password: 'testing123' }), expect.any(Object)));
});
test.each([[CreateProfile, false], [EditProfile, true]])('profile form preserves submitted fields (%s)', async (Component, editing) => {
  axios.get.mockResolvedValue({ data: profile });
  axios.post.mockResolvedValue({ data: profile });
  const { container } = mount(<Component />);
  if (editing) await waitFor(() => expect(screen.getByLabelText('Skills')).toHaveValue('React'));
  fireEvent.change(screen.getByLabelText('Professional status'), { target: { value: 'Developer' } });
  fireEvent.change(screen.getByLabelText('Skills'), { target: { value: 'React,Node' } });
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/profile', expect.objectContaining({ status: 'Developer', skills: 'React,Node' }), expect.any(Object)));
});
test.each([[AddExperience, 'experience', 'Job title'], [AddEducation, 'education', 'School']])('credential form keeps existing payload (%s)', async (Component, endpoint, label) => {
  axios.put.mockResolvedValue({ data: profile });
  const { container } = mount(<Component />);
  fireEvent.change(screen.getByLabelText(label), { target: { value: 'Example' } });
  fireEvent.click(screen.getByLabelText('Currently here'));
  expect(screen.getByLabelText('To date')).toBeDisabled();
  fireEvent.submit(container.querySelector('form'));
  await waitFor(() => expect(axios.put).toHaveBeenCalledWith('/api/profile/' + endpoint, expect.objectContaining({ current: true }), expect.any(Object)));
});
test('protected content remains inaccessible when signed out', () => {
  mount(<PrivateRoute><h1>Private content</h1></PrivateRoute>, '/posts', false);
  expect(screen.queryByText('Private content')).not.toBeInTheDocument();
});
