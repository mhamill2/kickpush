import { ADD_NEW_MESSAGE, GET_CONVERSATIONS_SUCCESS, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS, SEND_MESSAGE_SUCCESS } from './types';

const initialState = {
  conversations: [],
  messages: []
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: action.payload
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        messages: []
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default messageReducer;
