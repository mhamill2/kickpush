import {
  CANCEL_LESSONS_SUCCESS,
  CANCEL_LESSONS_FAILURE,
  CONNECTION_REQUEST_SUCCESS,
  CONNECTION_REQUEST_ACCEPTED,
  CONNECTION_REQUEST_DECLINED,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAILURE,
  LESSON_REQUEST_SUCCESS
} from './types';

const initialState = {
  connectionRequests: [],
  lessonRequests: [],
  lessons: []
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_LESSONS_FAILURE:
      return {
        ...state
      };
    case CANCEL_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map((lesson) => (lesson._id === action.payload._id ? action.payload : lesson))
      };
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
    case GET_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: action.payload
      };
    case GET_LESSONS_FAILURE:
      return {
        ...state,
        lessons: []
      };
    case LESSON_REQUEST_SUCCESS:
      return {
        ...state,
        lessonRequests: [...state.lessonRequests, action.payload],
        lessons: [...state.lessons, action.payload]
      };
    default:
      return state;
  }
};

export default lessonReducer;
