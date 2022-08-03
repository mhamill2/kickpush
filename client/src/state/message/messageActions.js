import axios from 'axios';

import store from '../store';
import { GET_MESSAGES_SUCCESS } from './types';
import setAuthToken from '../../utils/setAuthToken';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const getMessages = async () => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/getMessages');
    store.dispatch({ type: GET_MESSAGES_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

const getConversation = async (userId) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`/getConversation/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (message) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`/sendMessage/${message.receiverId}`, message, defaultPostConfig);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getMessages, getConversation, sendMessage };
