import React from 'react';
export default function Spinner() {
  return <div className="loading-state" role="status" aria-label="Loading content"><span className="sr-only">Loading...</span>
    {[1, 2, 3].map(i => <div className="skeleton-card" key={i} aria-hidden="true"><div className="skeleton skeleton-avatar" /><div><div className="skeleton skeleton-title" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line short" /></div></div>)}
  </div>;
}
