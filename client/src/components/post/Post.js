import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost, addComment } from '../../actions/post';
import EmptyState from '../ui/EmptyState';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import CommentItem from './CommentItem';
function Post({ getPost, addComment, post: { post, loading, error } }) {
  const { id } = useParams();
  useEffect(() => { getPost(id); }, [getPost, id]);
  if (loading) return <Spinner />;
  return <><Link to="/posts" className="btn">Back To Posts</Link>
    {error.msg && <EmptyState error title="Couldn’t load discussion" onRetry={() => getPost(id)}>{error.msg}</EmptyState>}
    {post ? <><PostItem post={post} showActions={false} />
      <h1 className="large my-1">Discussion <span className="badge">{post.comments.length}</span></h1>
      <PostForm key={post._id} label="Leave a comment" onSubmit={text => addComment(post._id, text)} />
      {!post.comments.length && <EmptyState title="No comments yet">Be the first to add your perspective.</EmptyState>}
      <div className="comments">{post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}</div>
    </> : !error.msg && <p>Post not found.</p>}
  </>;
}
export default connect(state => ({ post: state.post }), { getPost, addComment })(Post);
