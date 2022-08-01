import { GET_MESSAGES_SUCCESS } from './types';

const initialState = {
  messages: []
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
};

export default messageReducer;
