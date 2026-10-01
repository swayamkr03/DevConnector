import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import EmptyState from '../ui/EmptyState';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
function Profile({ getProfileById, profile: { profile, loading, error }, auth }) {
  const { id } = useParams();
  useEffect(() => { getProfileById(id); }, [getProfileById, id]);
  if (loading) return <Spinner />;
  if (!profile?.user) return <><Link to="/profiles" className="btn btn-light">Back To Profiles</Link><EmptyState error title="Profile unavailable" onRetry={() => getProfileById(id)}>{error.msg || 'This developer has not created a profile yet.'}</EmptyState></>;
  return <>
    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
    {auth.isAuthenticated && auth.user?._id === profile.user._id && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>}
    <nav className="section-nav" aria-label="Profile sections"><a href="#overview">Overview</a><a href="#experience">Experience</a><a href="#education">Education</a>{profile.githubusername && <a href="#repositories">Repositories</a>}</nav>
    <div className="profile-grid my-1">
      <ProfileTop profile={profile} /><ProfileAbout profile={profile} />
      <div id="experience" className="profile-exp bg-white p-2"><h2 className="text-primary">Experience</h2>
        {profile.experience.length ? profile.experience.map(item => <ProfileExperience key={item._id} experience={item} />) : <p>No experience added.</p>}
      </div>
      <div id="education" className="profile-edu bg-white p-2"><h2 className="text-primary">Education</h2>
        {profile.education.length ? profile.education.map(item => <ProfileEducation key={item._id} education={item} />) : <p>No education added.</p>}
      </div>
      {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
    </div>
  </>;
}
export default connect(state => ({ profile: state.profile, auth: state.auth }), { getProfileById })(Profile);
