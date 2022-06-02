import { INITIAL_LESSON_REQUEST_SUCCESS } from './types';
import store from '../store';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const sendInitialLessonRequest = async (initialLessonRequest) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/sendInitialLessonRequest', initialLessonRequest, defaultPostConfig);
    store.dispatch({ type: INITIAL_LESSON_REQUEST_SUCCESS, payload: res.data });
    return res;
  } catch (err) {
    return err.response;
  }
};

export { sendInitialLessonRequest };
