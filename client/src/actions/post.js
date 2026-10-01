import axios from 'axios';
import { setAlert } from './alert';
import { POST_LOADING, GET_POSTS, GET_POST, POST_ERROR, ADD_POST, DELETE_POST, UPDATE_LIKES, UPDATE_COMMENTS } from './types';
const fail = (dispatch, err) => {
  const error = { msg: err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Unable to reach server', status: err.response?.status };
  dispatch({ type: POST_ERROR, payload: error });
  dispatch(setAlert(error.msg, 'danger'));
};
export const getPosts = () => async dispatch => {
  dispatch({ type: POST_LOADING });
  try { const res = await axios.get('/api/posts'); dispatch({ type: GET_POSTS, payload: res.data }); }
  catch (err) { fail(dispatch, err); }
};
export const getPost = id => async dispatch => {
  dispatch({ type: POST_LOADING });
  try { const res = await axios.get('/api/posts/' + id); dispatch({ type: GET_POST, payload: res.data }); }
  catch (err) { fail(dispatch, err); }
};
export const addPost = text => async dispatch => {
  try { const res = await axios.post('/api/posts', { text }); dispatch({ type: ADD_POST, payload: res.data }); dispatch(setAlert('Post Added', 'success')); return true; }
  catch (err) { fail(dispatch, err); return false; }
};
export const deletePost = id => async dispatch => {
  try { await axios.delete('/api/posts/' + id); dispatch({ type: DELETE_POST, payload: id }); dispatch(setAlert('Post Removed', 'success')); }
  catch (err) { fail(dispatch, err); }
};
export const addLike = id => updateLike(id, 'like');
export const removeLike = id => updateLike(id, 'unlike');
const updateLike = (id, operation) => async dispatch => {
  try { const res = await axios.put('/api/posts/' + operation + '/' + id); dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } }); }
  catch (err) { fail(dispatch, err); }
};
export const addComment = (id, text) => async dispatch => {
  try { const res = await axios.post('/api/posts/comment/' + id, { text }); dispatch({ type: UPDATE_COMMENTS, payload: { id, comments: res.data } }); return true; }
  catch (err) { fail(dispatch, err); return false; }
};
export const deleteComment = (id, commentId) => async dispatch => {
  try { const res = await axios.delete('/api/posts/comment/' + id + '/' + commentId); dispatch({ type: UPDATE_COMMENTS, payload: { id, comments: res.data } }); }
  catch (err) { fail(dispatch, err); }
};
