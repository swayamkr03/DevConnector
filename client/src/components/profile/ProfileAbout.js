import React from 'react';
export default function ProfileAbout({ profile: { user, bio, skills = [] } }) {
  return <div id="overview" className="profile-about bg-light p-2">
    {bio && <><h2 className="text-primary">{user.name}'s Bio</h2><p>{bio}</p><div className="line" /></>}
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">{skills.map((skill, i) => <div key={i} className="p-1">{skill}</div>)}</div>
  </div>;
}
