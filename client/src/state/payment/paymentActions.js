import store from '../store';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const getStripeAccountLink = async () => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/getStripeAccountLink');
    return res.data.accountLink;
  } catch (err) {
    return err.response;
  }
};

const getStripeAccount = async () => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/getStripeAccount');
    return res.data.account;
  } catch (err) {
    return err.response;
  }
};

export { getStripeAccountLink, getStripeAccount };
