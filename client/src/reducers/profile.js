import { GET_PROFILE, UPDATE_PROFILE, GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE, GET_REPOS, REPOS_LOADING, REPOS_ERROR } from '../actions/types';
const initialState = { profile: null, profiles: [], repos: [], loading: true, error: {}, reposLoading: false, reposError: {} };
export default function profileReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE: return { ...state, profile: payload, loading: false, error: {} };
    case GET_PROFILES: return { ...state, profiles: payload, loading: false, error: {} };
    case PROFILE_ERROR: return { ...state, profile: null, loading: false, error: payload };
    case CLEAR_PROFILE: return { ...initialState };
    case REPOS_LOADING: return { ...state, repos: [], reposLoading: true, reposError: {} };
    case GET_REPOS: return { ...state, repos: payload, reposLoading: false };
    case REPOS_ERROR: return { ...state, repos: [], reposLoading: false, reposError: payload };
    default: return state;
  }
}
