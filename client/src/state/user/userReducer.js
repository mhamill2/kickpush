import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_USER_CONNECTIONS,
  SET_SOCKET,
  DELETE_SOCKET,
  UPLOAD_AVATAR_SUCCESS
} from './types';

const initialState = {
  user: null,
  authenticated: false,
  instructors: [],
  socket: null
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
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_USER_CONNECTIONS:
      return {
        ...state,
        user: {
          ...state.user,
          connections: [...state.user.connections, action.payload]
        }
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload
        }
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case DELETE_SOCKET:
      return {
        ...state,
        user: {
          ...state.user,
          socketIds: state.user.socketIds.filter((socketId) => socketId !== action.payload)
        }
      };
    default:
      return state;
  }
};

export default userReducer;
