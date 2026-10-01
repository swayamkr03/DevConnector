import axios from 'axios';
import { getProfileById, getGithubRepos } from './profile';
import { addPost, addComment, deleteComment } from './post';
import * as types from './types';
jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn(), delete: jest.fn() }));
jest.mock('./alert', () => ({ setAlert: (msg, alertType) => ({ type: 'TEST_ALERT', payload: { msg, alertType } }) }));
beforeEach(() => jest.clearAllMocks());
test('profile lookup uses the user endpoint', async () => {
  axios.get.mockResolvedValue({ data: { _id: 'profile' } });
  const dispatch = jest.fn();
  await getProfileById('user')(dispatch);
  expect(axios.get).toHaveBeenCalledWith('/api/profile/user/user');
  expect(dispatch).toHaveBeenLastCalledWith({ type: types.GET_PROFILE, payload: { _id: 'profile' } });
});
test('Github network errors use a separate error action', async () => {
  axios.get.mockRejectedValue(new Error('offline'));
  const dispatch = jest.fn();
  await getGithubRepos('octocat')(dispatch);
  expect(dispatch).toHaveBeenLastCalledWith({ type: types.REPOS_ERROR, payload: expect.objectContaining({ msg: 'Unable to reach server' }) });
});
test('post and comment submissions report success and update Redux', async () => {
  axios.post.mockResolvedValue({ data: { _id: 'p' } });
  const dispatch = jest.fn();
  expect(await addPost('hello')(dispatch)).toBe(true);
  expect(axios.post).toHaveBeenCalledWith('/api/posts', { text: 'hello' });
  axios.post.mockResolvedValue({ data: [{ _id: 'c' }] });
  expect(await addComment('p', 'reply')(dispatch)).toBe(true);
  expect(dispatch).toHaveBeenLastCalledWith({ type: types.UPDATE_COMMENTS, payload: { id: 'p', comments: [{ _id: 'c' }] } });
  axios.delete.mockResolvedValue({ data: [] });
  await deleteComment('p', 'c')(dispatch);
  expect(dispatch).toHaveBeenLastCalledWith({ type: types.UPDATE_COMMENTS, payload: { id: 'p', comments: [] } });
});
test('failed submissions do not report success', async () => {
  axios.post.mockRejectedValue(new Error('offline'));
  expect(await addPost('hello')(jest.fn())).toBe(false);
});
