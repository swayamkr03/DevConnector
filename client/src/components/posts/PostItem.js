import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
function PostItem({ post, auth, addLike, removeLike, deletePost, showActions = true }) {
  const [busy, setBusy] = useState(false);
  const run = async action => { setBusy(true); try { await action(post._id); } finally { setBusy(false); } };
  const liked = post.likes.some(like => like.user === auth.user?._id);
  return <article className="post">
    <header className="post-author"><Link to={'/profile/' + post.user}><Avatar src={post.avatar} name={post.name} /></Link><div>
      <Link to={'/profile/' + post.user}>{post.name}</Link><p className="post-date"><Moment fromNow title={new Date(post.date).toLocaleString()}>{post.date}</Moment> · shared with the community</p>
    </div></header>
    <p className="post-content">{post.text}</p>
    {showActions && <footer className="post-actions">
      <button className="btn" aria-label={liked ? 'Unlike post' : 'Like post'} aria-pressed={liked} disabled={busy} onClick={() => run(liked ? removeLike : addLike)}><Icon name="heart" size={16} />{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</button>
      <Link className="btn" to={'/posts/' + post._id}><Icon name="comment" size={16} />Discussion <span className="comment-count">{post.comments.length}</span></Link>
      {auth.user?._id === post.user && <button className="btn btn-danger delete-action" aria-label="Delete post" disabled={busy} onClick={() => run(deletePost)}><Icon name="trash" size={15} />Delete</button>}
    </footer>}
  </article>;
}
export default connect(state => ({ auth: state.auth }), { addLike, removeLike, deletePost })(PostItem);
