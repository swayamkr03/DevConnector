import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';
function Posts({ getPosts, addPost, post: { posts, loading, error } }) {
  useEffect(() => { getPosts(); }, [getPosts]);
  if (loading) return <Spinner />;
  return <><h1 className="large text-primary">Posts</h1><p className="lead">Welcome to the community</p>
    <PostForm onSubmit={addPost} />
    {error.msg && <p role="alert">{error.msg}</p>}
    {!posts.length && !error.msg && <p>No posts yet. Start the conversation!</p>}
    <div className="posts">{posts.map(post => <PostItem key={post._id} post={post} />)}</div>
  </>;
}
export default connect(state => ({ post: state.post }), { getPosts, addPost })(Posts);
