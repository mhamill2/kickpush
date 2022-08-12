import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, SET_SOCKET, DELETE_SOCKET } from './types';
import store from '../store';
import setAuthToken from '../../utils/setAuthToken';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const register = async (userData) => {
  try {
    const res = await axios.post('/register', userData, defaultPostConfig);
    store.dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    store.dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
  }
};

const login = async (userData) => {
  try {
    const res = await axios.post('/login', userData, defaultPostConfig);
    store.dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    store.dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
  }
};

const logout = async (userData) => {
  setAuthToken(localStorage.token);

  try {
    await axios.post('/logout', userData, defaultPostConfig);
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch({ type: LOGOUT });
  }
};

const loadUser = async (token) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/loadUser');
    store.dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    store.dispatch({ type: AUTH_ERROR });
  }
};

const getUser = async (userId) => {
  try {
    const res = await axios.get(`/getUser/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateInstructorProfile = async (user) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/updateInstructorProfile', user, defaultPostConfig);
    store.dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    store.dispatch({ type: PROFILE_UPDATE_FAIL, payload: err.response.data.msg });
  }
};

const updateStudentProfile = async (user) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/updateStudentProfile', user, defaultPostConfig);
    store.dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    store.dispatch({ type: PROFILE_UPDATE_FAIL, payload: err.response.data.msg });
  }
};

const updateUserLocation = async (user, address) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/updateLocation', { user, address }, defaultPostConfig);
    store.dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    store.dispatch({ type: PROFILE_UPDATE_FAIL, payload: err.response.data.msg });
  }
};

const setSocket = (socket) => {
  store.dispatch({ type: SET_SOCKET, payload: socket });
};

const deleteSocket = () => {
  store.dispatch({ type: DELETE_SOCKET });
};

export { register, login, logout, loadUser, updateInstructorProfile, updateStudentProfile, updateUserLocation, getUser, setSocket, deleteSocket };
