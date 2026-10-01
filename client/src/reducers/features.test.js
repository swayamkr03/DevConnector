import profile from './profile';
import post from './post';
import * as types from '../actions/types';
test('profiles stop loading and profile errors clear stale data', () => {
  const listed = profile(undefined, { type: types.GET_PROFILES, payload: [{ _id: 'p' }] });
  expect(listed.loading).toBe(false);
  const loaded = profile(listed, { type: types.GET_PROFILE, payload: { _id: 'p' } });
  const failed = profile(loaded, { type: types.PROFILE_ERROR, payload: { msg: 'Missing' } });
  expect(failed.profile).toBeNull();
  expect(failed.loading).toBe(false);
});
test('Github loading and failures never remove the displayed profile', () => {
  const loaded = profile(undefined, { type: types.GET_PROFILE, payload: { _id: 'p' } });
  const pending = profile(loaded, { type: types.REPOS_LOADING });
  const failed = profile(pending, { type: types.REPOS_ERROR, payload: { msg: 'Rate limit' } });
  expect(failed.profile._id).toBe('p');
  expect(failed.reposLoading).toBe(false);
});
test('post likes and comments update both list and detail; logout clears posts', () => {
  const item = { _id: 'p', likes: [], comments: [] };
  let state = post(undefined, { type: types.GET_POSTS, payload: [item] });
  state = post(state, { type: types.GET_POST, payload: item });
  state = post(state, { type: types.UPDATE_LIKES, payload: { id: 'p', likes: [{ user: 'u' }] } });
  state = post(state, { type: types.UPDATE_COMMENTS, payload: { id: 'p', comments: [{ _id: 'c' }] } });
  expect(state.posts[0]).toEqual(state.post);
  expect(state.post.likes).toHaveLength(1);
  expect(state.post.comments).toHaveLength(1);
  expect(post(state, { type: types.DELETE_POST, payload: 'p' }).posts).toEqual([]);
  expect(post(state, { type: types.LOGOUT }).post).toBeNull();
});
