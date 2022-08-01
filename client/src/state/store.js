import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import lessonsReducer from './lessons/lessonReducer';
import messageReducer from './message/messageReducer';
import navReducer from './nav/navReducer';
import searchReducer from './search/searchReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  lessons: lessonsReducer,
  message: messageReducer,
  nav: navReducer,
  search: searchReducer,
  user: userReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
