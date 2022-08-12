import axios from 'axios';

import store from '../store';
import { GET_CONVERSATIONS_SUCCESS, SEND_MESSAGE_SUCCESS } from './types';
import setAuthToken from '../../utils/setAuthToken';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const getConversations = async () => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/getConversations');
    store.dispatch({ type: GET_CONVERSATIONS_SUCCESS, payload: res.data });
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

const addNewMessage = async (message) => {
  console.log('addNewMessage: ', message);
  store.dispatch({ type: SEND_MESSAGE_SUCCESS, payload: message });
};

export { getConversations, getConversation, sendMessage, addNewMessage };
