import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';
import EmptyState from '../ui/EmptyState';
import Icon from '../ui/Icon';
function Posts({ getPosts, addPost, post: { posts, loading, error } }) {
  useEffect(() => { getPosts(); }, [getPosts]);
  return <><div className="page-heading"><div><span className="eyebrow">BUILD. SHARE. DISCUSS.</span><h1>Community feed</h1><p>A conversation is the beginning of something good.</p></div><Icon name="comment" size={28} /></div>
    <div className="feed-layout"><section aria-label="Community posts">
      <PostForm onSubmit={addPost} label="Share something with the community" />
      {loading ? <Spinner /> : <>
        {error.msg && <EmptyState error title="Something went wrong" onRetry={getPosts}>{error.msg}</EmptyState>}
        {!posts.length && !error.msg && <EmptyState title="Start the conversation">Share what you're building, ask a question, or introduce yourself.</EmptyState>}
        <div className="posts">{posts.map(post => <PostItem key={post._id} post={post} />)}</div>
      </>}
    </section><aside className="feed-aside"><div className="panel"><Icon name="users" /><h3 className="my-1">Better, together.</h3><p>Find developers with familiar skills and fresh perspectives.</p><Link to="/profiles" className="btn">Explore developers</Link></div><div className="panel my-1"><h3>A good place to start</h3><p>Share a lesson learned. Ask a thoughtful question. Help someone get unstuck.</p><p>Be curious. Be constructive. Be kind.</p></div></aside></div>
  </>;
}
export default connect(state => ({ post: state.post }), { getPosts, addPost })(Posts);
