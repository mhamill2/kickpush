import {
  ACCEPT_LESSON_SUCCESS,
  CANCEL_LESSON_SUCCESS,
  CANCEL_LESSON_FAILURE,
  CONNECTION_REQUEST_SUCCESS,
  CONNECTION_REQUEST_ACCEPTED,
  CONNECTION_REQUEST_DECLINED,
  EDIT_LESSON_SUCCESS,
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
    case ACCEPT_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map((lesson) => (lesson._id === action.payload._id ? action.payload : lesson))
      };
    case CANCEL_LESSON_FAILURE:
      return {
        ...state
      };
    case CANCEL_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson._id !== action.payload._id)
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
    case EDIT_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map((lesson) => (lesson._id === action.payload._id ? action.payload : lesson))
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
