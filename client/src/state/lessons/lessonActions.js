import { CONNECTION_REQUEST_SUCCESS, CONNECTION_REQUEST_ACCEPTED, CONNECTION_REQUEST_DECLINED } from './types';
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

const sendConnectionRequestResponse = async (connectionRequestId, responseMessage, accepted) => {
  setAuthToken(localStorage.token);
  let res = null;

  try {
    if (accepted) {
      res = await axios.post('/acceptConnectionRequest', { connectionRequestId, responseMessage });
      console.log(res.data);
      store.dispatch({ type: CONNECTION_REQUEST_ACCEPTED, payload: res.data.connectionRequestId });
    } else {
      res = await axios.post('/declineConnectionRequest', { connectionRequestId, responseMessage });
      store.dispatch({ type: CONNECTION_REQUEST_DECLINED, payload: res.data.connectionRequestId });
    }

    return res.data;
  } catch (err) {
    return err.response;
  }
};

export { sendConnectionRequest, getPendingConnectionRequests, sendConnectionRequestResponse };
