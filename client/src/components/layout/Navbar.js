import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';

function Navbar({ auth: { isAuthenticated, loading, user }, logout }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('devconnector-theme') || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    catch { return 'light'; }
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('devconnector-theme', theme); } catch {}
  }, [theme]);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="navbar">
      <Link className="brand" to="/"><span className="brand-mark"><Icon size={23} /></span>DevConnector<span className="brand-dot">.</span></Link>
      <button className="icon-button mobile-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><Icon name="menu" /></button>
      <nav id="primary-navigation" aria-label="Main navigation" className={'nav-content' + (open ? ' is-open' : '')} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink><NavLink to="/profiles">Developers</NavLink>
          {isAuthenticated && <NavLink to="/posts">Feed</NavLink>}
        </div>
        <form className="nav-search" role="search" onSubmit={e => { e.preventDefault(); navigate('/profiles?q=' + encodeURIComponent(query.trim())); }}>
          <Icon name="search" /><input aria-label="Search developers" placeholder="Search developers..." value={query} onChange={e => setQuery(e.target.value)} />
        </form>
        <div className="nav-actions">
          <button className="icon-button" aria-label={'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
          {!loading && (isAuthenticated ? <details className="user-menu" key={location.pathname} onKeyDown={e => { if (e.key === 'Escape') { e.currentTarget.removeAttribute('open'); e.currentTarget.querySelector('summary').focus(); } }}>
            <summary aria-label="Account menu"><Avatar src={user?.avatar} name={user?.name} /><span className="menu-chevron">⌄</span></summary>
            <div className="menu-panel"><p>Signed in as <strong>{user?.name || 'Developer'}</strong></p>
              <Link to="/dashboard">Your dashboard</Link>{user && <Link to={'/profile/' + user._id}>Your public profile</Link>}
              <button onClick={logout}>Sign out</button>
            </div>
          </details> : <><Link to="/login">Sign in</Link><Link className="btn btn-primary" to="/register">Join community</Link></>)}
        </div>
      </nav>
    </div>
  </header>;
}
export default connect(state => ({ auth: state.auth }), { logout })(Navbar);
