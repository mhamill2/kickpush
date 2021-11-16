import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from './types';

const initialState = {
  user: null,
  authenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        authenticated: true
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
