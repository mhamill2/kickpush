import { GET_MESSAGES_SUCCESS, SEND_MESSAGE_SUCCESS } from './types';

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
    case SEND_MESSAGE_SUCCESS:
      console.log(action.payload);
      console.log(state.messages);

      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default messageReducer;
