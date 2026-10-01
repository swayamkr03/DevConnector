import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
function PostItem({ post, auth, addLike, removeLike, deletePost, showActions = true }) {
  const [busy, setBusy] = useState(false);
  const run = async action => { setBusy(true); try { await action(post._id); } finally { setBusy(false); } };
  const liked = post.likes.some(like => like.user === auth.user?._id);
  return <div className="post bg-white p-1 my-1"><div>
    <Link to={'/profile/' + post.user}><img className="round-img" src={post.avatar} alt={post.name} /><h4>{post.name}</h4></Link>
  </div><div><p className="my-1">{post.text}</p><p className="post-date">Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment></p>
    {showActions && <>
      <button className="btn btn-light" aria-label="Like post" disabled={busy || liked} onClick={() => run(addLike)}><i className="fas fa-thumbs-up" /> {post.likes.length}</button>
      <button className="btn btn-light" aria-label="Unlike post" disabled={busy || !liked} onClick={() => run(removeLike)}><i className="fas fa-thumbs-down" /></button>
      <Link className="btn btn-primary" to={'/posts/' + post._id}>Discussion <span className="comment-count">{post.comments.length}</span></Link>
      {auth.user?._id === post.user && <button className="btn btn-danger" aria-label="Delete post" disabled={busy} onClick={() => run(deletePost)}><i className="fas fa-times" /></button>}
    </>}
  </div></div>;
}
export default connect(state => ({ auth: state.auth }), { addLike, removeLike, deletePost })(PostItem);
