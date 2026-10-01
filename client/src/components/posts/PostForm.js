import React, { useState } from 'react';
export default function PostForm({ onSubmit, label = 'Say Something...' }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async event => {
    event.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try { if (await onSubmit(text.trim())) setText(''); } finally { setBusy(false); }
  };
  return <div className="post-form"><div className="bg-primary p"><h3>{label}</h3></div>
    <form className="form my-1" onSubmit={submit}>
      <textarea aria-label={label} name="text" rows="3" placeholder={label} value={text} onChange={event => setText(event.target.value)} required />
      <button className="btn btn-primary my-1" type="submit" disabled={busy || !text.trim()}>{busy ? 'Submitting...' : 'Submit'}</button>
    </form>
  </div>;
}
