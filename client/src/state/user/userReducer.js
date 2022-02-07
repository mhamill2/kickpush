import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, USER_LOADED, PROFILE_UPDATE_SUCCESS } from './types';

const initialState = {
  user: null,
  authenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        authenticated: true
      };
    case PROFILE_UPDATE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        authenticated: false
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    default:
      return state;
  }
};

export default userReducer;
