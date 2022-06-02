import { INITIAL_LESSON_REQUEST_SUCCESS } from './types';

const initialState = {
  lessonRequests: []
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LESSON_REQUEST_SUCCESS:
      return {
        ...state,
        lessonRequests: [...state.lessonRequests, action.payload]
      };
    default:
      return state;
  }
};

export default lessonReducer;
