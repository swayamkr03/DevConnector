import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../ui/Icon';
function Landing({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <main id="main-content" className="landing">
    <div className="landing-hero"><div className="hero-copy">
      <span className="eyebrow"><span className="status-dot" /> A community for people who build</span>
      <h1>Good code starts<br />with <span>great connections.</span></h1>
      <p>Your work. Your story. Your next conversation.<br /> A home for developers to share what they're building and learn from each other.</p>
      <div className="button-row"><Link to="/register" className="btn btn-primary">Create your profile <Icon name="arrow" /></Link><Link to="/profiles" className="btn">Explore developers</Link></div>
      <p className="hero-note"><Icon name="code" /> Built for developers, at every stage.</p>
    </div><div className="readme-card">
      <div className="card-toolbar"><Icon name="book" /><span>community / <strong>README.md</strong></span><span className="badge">Public</span></div>
      <div className="readme-content"><span className="eyebrow">HELLO, DEVELOPER</span><h2>Your next chapter<br />starts here.</h2><p>Behind every commit is a person.<br />Let's get to know yours.</p>
        <ul className="readme-list"><li><Icon name="check" /> Tell your developer story</li><li><Icon name="check" /> Share your GitHub repositories</li><li><Icon name="check" /> Learn through conversations</li></ul>
        <div className="code-line"><span>$</span> connect --with your-community<span className="cursor">_</span></div>
      </div>
    </div></div>
    <div className="landing-sections"><div className="section-intro"><span className="eyebrow">MORE THAN A PROFILE</span><h2>A place for your developer life.</h2></div>
      <div className="feature-grid">
        <Link to="/profiles" className="feature-card"><Icon name="users" /><h3>Find your people</h3><p>Explore developers by skills, experience, and the things they care about.</p><span>Meet the community →</span></Link>
        <Link to="/register" className="feature-card"><Icon name="book" /><h3>Make your work visible</h3><p>Bring your skills, career, and public GitHub repositories into one profile.</p><span>Build your profile →</span></Link>
        <Link to="/login" className="feature-card"><Icon name="comment" /><h3>Keep the conversation going</h3><p>Share a thought, ask a question, or join a discussion in the community feed.</p><span>Join the conversation →</span></Link>
      </div>
    </div>
    <footer className="site-footer"><span>DevConnector — built around developers.</span><Link to="/profiles">Explore the community <Icon name="arrow" /></Link></footer>
  </main>;
}
export default connect(state => ({ isAuthenticated: state.auth.isAuthenticated }))(Landing);
