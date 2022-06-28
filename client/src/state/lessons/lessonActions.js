import { CONNECTION_REQUEST_SUCCESS } from './types';
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

export { sendConnectionRequest };
