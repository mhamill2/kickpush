import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import navReducer from './nav/navReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
