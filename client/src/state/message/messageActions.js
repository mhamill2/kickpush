import axios from 'axios';

import store from '../store';
import { GET_MESSAGES_SUCCESS } from './types';

const getMessages = async () => {
  try {
    const res = await axios.get('/getMessages');
    console.log(res.data);
    store.dispatch({ type: GET_MESSAGES_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export { getMessages };
