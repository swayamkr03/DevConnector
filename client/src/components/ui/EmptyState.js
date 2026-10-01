import React from 'react';
import Icon from './Icon';
export default function EmptyState({ title, children, error = false, onRetry }) {
  return <div className={'empty-state' + (error ? ' error-state' : '')} role={error ? 'alert' : 'status'}>
    <Icon name={error ? 'link' : 'book'} size={28} /><h3>{title}</h3>{children && <p>{children}</p>}
    {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
  </div>;
}
