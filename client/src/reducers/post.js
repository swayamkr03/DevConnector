import { POST_LOADING, GET_POSTS, GET_POST, POST_ERROR, ADD_POST, DELETE_POST, UPDATE_LIKES, UPDATE_COMMENTS, LOGOUT, AUTH_ERROR, DELETE_ACCOUNT } from '../actions/types';
const initialState = { posts: [], post: null, loading: true, error: {} };
export default function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    case POST_LOADING: return { ...state, post: null, loading: true, error: {} };
    case GET_POSTS: return { ...state, posts: payload, loading: false, error: {} };
    case GET_POST: return { ...state, post: payload, loading: false, error: {} };
    case ADD_POST: return { ...state, posts: [payload, ...state.posts], error: {} };
    case DELETE_POST: return { ...state, posts: state.posts.filter(post => post._id !== payload), post: state.post?._id === payload ? null : state.post };
    case UPDATE_LIKES:
    case UPDATE_COMMENTS: {
      const field = type === UPDATE_LIKES ? 'likes' : 'comments';
      const update = post => post._id === payload.id ? { ...post, [field]: payload[field] } : post;
      return { ...state, posts: state.posts.map(update), post: state.post && update(state.post), error: {} };
    }
    case POST_ERROR: return { ...state, loading: false, error: payload };
    case LOGOUT:
    case AUTH_ERROR:
    case DELETE_ACCOUNT: return initialState;
    default: return state;
  }
}
