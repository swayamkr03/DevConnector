import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
function CommentItem({ comment, postId, auth, deleteComment }) {
  const [busy, setBusy] = useState(false);
  const remove = async () => { setBusy(true); try { await deleteComment(postId, comment._id); } finally { setBusy(false); } };
  return <div className="post bg-white p-1 my-1"><div><Link to={'/profile/' + comment.user}>
    <img className="round-img" src={comment.avatar} alt={comment.name} /><h4>{comment.name}</h4>
  </Link></div><div><p className="my-1">{comment.text}</p><p className="post-date">Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
    {auth.user?._id === comment.user && <button className="btn btn-danger" aria-label="Delete comment" disabled={busy} onClick={remove}><i className="fas fa-times" /></button>}
  </div></div>;
}
export default connect(state => ({ auth: state.auth }), { deleteComment })(CommentItem);
