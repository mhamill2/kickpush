import { CONNECTION_REQUEST_SUCCESS, CONNECTION_REQUEST_ACCEPTED, CONNECTION_REQUEST_DECLINED } from './types';

const initialState = {
  connectionRequests: []
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_REQUEST_SUCCESS:
      return {
        ...state,
        connectionRequests: [...state.connectionRequests, action.payload]
      };
    case CONNECTION_REQUEST_ACCEPTED:
      return {
        ...state,
        connectionRequests: state.connectionRequests.filter((connectionRequest) => connectionRequest._id !== action.payload)
      };
    case CONNECTION_REQUEST_DECLINED:
      return {
        ...state,
        connectionRequests: state.connectionRequests.filter((connectionRequest) => connectionRequest._id !== action.payload)
      };
    default:
      return state;
  }
};

export default lessonReducer;
