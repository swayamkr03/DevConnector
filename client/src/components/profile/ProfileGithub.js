import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import EmptyState from '../ui/EmptyState';
import safeUrl from '../../utils/safeUrl';
function ProfileGithub({ username, getGithubRepos, profile: { repos, reposLoading, reposError } }) {
  useEffect(() => { getGithubRepos(username); }, [getGithubRepos, username]);
  return <div id="repositories" className="profile-github"><h2 className="text-primary my-1">Latest public repositories</h2>
    {reposLoading ? <Spinner /> : reposError.msg ? <EmptyState error title="Repositories unavailable" onRetry={() => getGithubRepos(username)}>{reposError.msg}</EmptyState> : !repos.length ? <EmptyState title="No public repositories">Public repositories for this GitHub account will appear here.</EmptyState> :
      repos.map(repo => <div key={repo.id} className="repo bg-white p-1 my-1"><div>
        <h4><a href={safeUrl(repo.html_url)} target="_blank" rel="noopener noreferrer">{repo.name}</a></h4><p>{repo.description}</p>
      </div><div><ul><li className="badge badge-primary">Stars: {repo.stargazers_count}</li><li className="badge badge-dark">Watchers: {repo.watchers_count}</li><li className="badge badge-light">Forks: {repo.forks_count}</li></ul></div></div>)}
  </div>;
}
export default connect(state => ({ profile: state.profile }), { getGithubRepos })(ProfileGithub);
