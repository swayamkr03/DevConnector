import React from 'react';
import safeUrl from '../../utils/safeUrl';
const ProfileTop = ({ profile: { user, status, company, location, website, social = {} } }) => (
  <div className="profile-top bg-primary p-2">
    <img className="round-img my-1" src={user.avatar} alt={user.name} />
    <h1 className="large">{user.name}</h1>
    <p className="lead">{status}{company && ' at ' + company}</p>
    {location && <p>{location}</p>}
    <div className="icons my-1">
      {Object.entries({ website, ...social }).map(([label, url]) => safeUrl(url) && (
        <a key={label} href={safeUrl(url)} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <i className={label === 'website' ? 'fas fa-globe fa-2x' : 'fab fa-' + label + ' fa-2x'} />
        </a>
      ))}
    </div>
  </div>
);
export default ProfileTop;
