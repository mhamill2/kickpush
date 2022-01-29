import { NAV_HOME, NAV_PROFILE } from './types';

const initialState = {
  activePage: null
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV_HOME:
      return {
        ...state,
        activePage: 'home'
      };
    case NAV_PROFILE:
      return {
        ...state,
        activePage: 'myProfile'
      };
    default:
      return state;
  }
};

export default navReducer;
