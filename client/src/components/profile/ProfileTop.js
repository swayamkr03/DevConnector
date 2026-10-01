import React from 'react';
import safeUrl from '../../utils/safeUrl';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
const ProfileTop = ({ profile: { user, status, company, location, website, githubusername, social = {} } }) => (
  <aside className="profile-top">
    <Avatar src={user.avatar} name={user.name} />
    <h1>{user.name}</h1>
    {githubusername && <p className="profile-handle">@{githubusername}</p>}
    <p className="lead">{status}{company && ' at ' + company}</p>
    {location && <p><Icon name="pin" size={16} /> {location}</p>}
    <div className="icons my-1">
      {Object.entries({ website, ...(githubusername ? { github: 'https://github.com/' + encodeURIComponent(githubusername) } : {}), ...social }).map(([label, url]) => safeUrl(url) && (
        <a key={label} href={safeUrl(url)} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon name={label === 'github' ? 'code' : 'link'} size={16} />{label === 'website' ? 'Website' : label.charAt(0).toUpperCase() + label.slice(1)}</a>
      ))}
    </div>
  </aside>
);
export default ProfileTop;
