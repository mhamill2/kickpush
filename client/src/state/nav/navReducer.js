import { NAV_HOME, NAV_PROFILE, HIDE_BOTTOM_NAV, NAV_MESSAGING } from './types';

const initialState = {
  activePage: null,
  showBottomNav: false
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV_HOME:
      return {
        ...state,
        activePage: 'home',
        showBottomNav: true
      };
    case NAV_PROFILE:
      return {
        ...state,
        activePage: 'myProfile',
        showBottomNav: true
      };
    case NAV_MESSAGING:
      return {
        ...state,
        activePage: 'messages',
        showBottomNav: true
      };
    case HIDE_BOTTOM_NAV:
      return {
        ...state,
        showBottomNav: false
      };
    default:
      return state;
  }
};

export default navReducer;
