import {
  ACCEPT_LESSON_SUCCESS,
  ACCEPT_LESSON_FAILURE,
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

import { UPDATE_USER_CONNECTIONS } from '../user/types';
import store from '../store';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const sendConnectionRequest = async (connectionRequest) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/sendConnectionRequest', connectionRequest, defaultPostConfig);
    store.dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: res.data });
    return res;
  } catch (err) {
    return err.response;
  }
};

const getPendingConnectionRequests = async (getConnectionRequests) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/getPendingConnectionRequests');
    store.dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: res.data });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

const sendConnectionRequestResponse = async (connectionRequest, responseMessage, accepted) => {
  setAuthToken(localStorage.token);
  const connectionRequestId = connectionRequest._id;
  let res = null;

  try {
    if (accepted) {
      res = await axios.post('/acceptConnectionRequest', { connectionRequestId, responseMessage });
      store.dispatch({ type: CONNECTION_REQUEST_ACCEPTED, payload: connectionRequestId });
      store.dispatch({ type: UPDATE_USER_CONNECTIONS, payload: res.data });
    } else {
      res = await axios.post('/declineConnectionRequest', { connectionRequestId, responseMessage });
      store.dispatch({ type: CONNECTION_REQUEST_DECLINED, payload: connectionRequestId });
    }

    return res.data;
  } catch (err) {
    return err.response;
  }
};

const sendLessonRequest = async (lessonRequest) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/sendLessonRequest', lessonRequest);
    store.dispatch({ type: LESSON_REQUEST_SUCCESS, payload: res.data });
  } catch (err) {
    return err.response;
  }
};

const editLessonRequest = async (lessonRequest) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/sendLessonRequest', lessonRequest);
    store.dispatch({ type: EDIT_LESSON_SUCCESS, payload: res.data });
  } catch (err) {
    return err.response;
  }
};

const getLessons = async (userId) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`/getLessons/${userId}`);
    store.dispatch({ type: GET_LESSONS_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.response);
    store.dispatch({ type: GET_LESSONS_FAILURE });
  }
};

const acceptLesson = async (lessonId) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/acceptLesson', { lessonId });
    console.log(res);
    store.dispatch({ type: ACCEPT_LESSON_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.response);
    store.dispatch({ type: ACCEPT_LESSON_FAILURE });
  }
};

const cancelLesson = async (lessonId) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/cancelLesson', { lessonId });
    store.dispatch({ type: CANCEL_LESSON_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.response);
    store.dispatch({ type: CANCEL_LESSON_FAILURE });
  }
};

export {
  sendConnectionRequest,
  editLessonRequest,
  getLessons,
  getPendingConnectionRequests,
  sendConnectionRequestResponse,
  sendLessonRequest,
  acceptLesson,
  cancelLesson
};
