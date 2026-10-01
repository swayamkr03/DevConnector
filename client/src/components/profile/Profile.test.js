import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
test('profile components display real user data and only safe external links', () => {
  const profile = { user: { name: 'Developer', avatar: '/avatar.png' }, status: 'Developer', company: 'Example', location: 'India', bio: 'Building apps', skills: ['React'], website: 'https://example.com', social: { twitter: 'javascript:alert(1)' } };
  render(<><ProfileTop profile={profile} /><ProfileAbout profile={profile} />
    <ProfileExperience experience={{ company: 'Example', title: 'Engineer', from: '2022-01-01', current: true }} />
    <ProfileEducation education={{ school: 'College', degree: 'BSc', fieldofstudy: 'Computing', from: '2018-01-01', to: '2021-01-01' }} /></>);
  expect(screen.getByRole('heading', { name: 'Developer', exact: true })).toBeInTheDocument();
  expect(screen.getByText('Building apps')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Engineer')).toBeInTheDocument();
  expect(screen.getByText('Computing')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'website' })).toHaveAttribute('href', 'https://example.com/');
  expect(screen.queryByRole('link', { name: 'twitter' })).not.toBeInTheDocument();
});
