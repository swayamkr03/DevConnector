import React, { useState, useEffect } from 'react';
export default function Avatar({ src, name = 'Developer', className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  return src && !failed ? <img className={'avatar ' + className} src={src} alt={name} onError={() => setFailed(true)} /> :
    <span className={'avatar avatar-fallback ' + className} role="img" aria-label={name}>{name.trim().slice(0, 2).toUpperCase()}</span>;
}
