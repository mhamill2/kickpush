import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import navReducer from './nav/navReducer';
import searchReducer from './search/searchReducer';
import lessonsReducer from './lessons/lessonReducer';

const rootReducer = combineReducers({
  user: userReducer,
  nav: navReducer,
  search: searchReducer,
  lessons: lessonsReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
