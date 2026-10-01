import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
export default function ProfileItems({ profile: { user: { _id, name, avatar }, status, company, location, skills = [], bio, githubusername } }) {
  return <article className="profile">
    <Link to={'/profile/' + _id} aria-label={'View ' + name + "'s profile"}><Avatar src={avatar} name={name} /></Link>
    <div><h2><Link to={'/profile/' + _id}>{name}</Link>{githubusername && <span className="profile-handle">@{githubusername}</span>}</h2>
      <p>{bio || status}</p><div className="tags">{skills.map((skill, i) => <span className="tag" key={i}>{skill}</span>)}</div>
      <div className="metadata">{company && <span><Icon name="book" size={14} /> {company}</span>}{location && <span><Icon name="pin" size={14} /> {location}</span>}<span>{status}</span></div>
    </div><Link to={'/profile/' + _id} className="btn">View profile <Icon name="arrow" size={14} /></Link>
  </article>;
}
