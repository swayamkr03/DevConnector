import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
function CommentItem({ comment, postId, auth, deleteComment }) {
  const [busy, setBusy] = useState(false);
  const remove = async () => { setBusy(true); try { await deleteComment(postId, comment._id); } finally { setBusy(false); } };
  return <article className="post"><header className="post-author"><Link to={'/profile/' + comment.user}><Avatar src={comment.avatar} name={comment.name} /></Link>
    <div><Link to={'/profile/' + comment.user}>{comment.name}</Link><p className="post-date"><Moment fromNow title={new Date(comment.date).toLocaleString()}>{comment.date}</Moment></p></div>
  </header><p className="post-content">{comment.text}</p>
    {auth.user?._id === comment.user && <button className="btn btn-danger" aria-label="Delete comment" disabled={busy} onClick={remove}><Icon name="trash" size={14} />Delete</button>}
  </article>;
}
export default connect(state => ({ auth: state.auth }), { deleteComment })(CommentItem);
