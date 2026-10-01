import React, { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItems';
import Spinner from '../layout/Spinner';
import EmptyState from '../ui/EmptyState';
import Icon from '../ui/Icon';
function Profiles({ getProfiles, profile: { profiles, loading, error } }) {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [skill, setSkill] = useState('');
  useEffect(() => { getProfiles(); }, [getProfiles]);
  const available = profiles.filter(profile => profile.user);
  const skills = [...new Set(available.flatMap(profile => profile.skills || []))].sort();
  const filtered = available.filter(profile => {
    const text = [profile.user.name, profile.githubusername, profile.bio, profile.company, profile.location, ...(profile.skills || [])].filter(Boolean).join(' ').toLowerCase();
    return text.includes(query.toLowerCase()) && (!skill || profile.skills.includes(skill));
  });
  return <>
    <div className="page-heading"><div><span className="eyebrow">THE COMMUNITY</span><h1>Discover developers</h1><p>Find people who share your curiosity. Build something together.</p></div><Icon name="users" size={28} /></div>
    <div className="workspace"><aside className="side-panel"><nav className="side-links" aria-label="Directory"><NavLink to="/profiles"><Icon name="users" /> All developers</NavLink></nav>
      <div className="panel"><h2>A world of experience</h2><p>Search by name, skill, company, or location. Every profile is a different perspective.</p></div></aside>
      <section aria-label="Developer directory">
        <div className="directory-tools"><div className="search-field"><Icon name="search" /><input aria-label="Filter developers" placeholder="Search by name, skill, or location..." value={query} onChange={e => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} /></div>
          <select aria-label="Filter by skill" style={{ width: 'auto' }} value={skill} onChange={e => setSkill(e.target.value)}><option value="">All skills</option>{skills.map(item => <option key={item}>{item}</option>)}</select>
        </div>
        {loading ? <Spinner /> : error.msg ? <EmptyState error title="Couldn't load developers" onRetry={getProfiles}>{error.msg}</EmptyState> :
          <><p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'developer' : 'developers'}{query || skill ? ' matching your search' : ' in the community'}</p>
            {!filtered.length && <EmptyState title="No developers found">Try a different search or clear your skill filter.</EmptyState>}
            <div className="profiles">{filtered.map(profile => <ProfileItem key={profile._id} profile={profile} />)}</div></>}
      </section>
    </div>
  </>;
}
export default connect(state => ({ profile: state.profile }), { getProfiles })(Profiles);
