import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import lessonReducer from './lessons/lessonReducer';
import messageReducer from './message/messageReducer';
import navReducer from './nav/navReducer';
import searchReducer from './search/searchReducer';
import userReducer from './user/userReducer';

const appReducer = combineReducers({
  lesson: lessonReducer,
  message: messageReducer,
  nav: navReducer,
  search: searchReducer,
  user: userReducer
});

// Clear the app state on logout
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('token');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
