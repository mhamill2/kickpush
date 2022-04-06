import { GET_INSTRUCTORS_SUCCESS } from './types';

const initialState = {
  instructors: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTRUCTORS_SUCCESS:
      return {
        ...state,
        instructors: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
