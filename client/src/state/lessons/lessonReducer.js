import { CONNECTION_REQUEST_SUCCESS } from './types';

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
    default:
      return state;
  }
};

export default lessonReducer;
