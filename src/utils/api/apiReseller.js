import axios from 'axios';
import {
  API_BECOME_RESELLER,
  API_ACCEPT_RESELLER,
  API_REQUESTED_RESELLER,
  API_ACTIVE_RESELLER,
  BASE_URL,
} from '../../config';
import { getUserData } from '../authentication';

// Post Become Reseller
const apiPostBecomeReseller = async (name, address, city, phone, email) => {
  const user = await getUserData();

  const URL = `${BASE_URL}${API_BECOME_RESELLER}`;
  const headers = {
    Authorization: user.token,
  };
  const data = { name, address, city, phone, email };

  const response = await axios.post(URL, data, { headers });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(responseJSON.data));
  }

  return null;
};

// Post Accept Reseller
const apiPostAcceptReseller = async id => {
  const user = await getUserData();

  const URL = `${BASE_URL}${API_ACCEPT_RESELLER}`;
  const headers = {
    Authorization: user.token,
  };
  const data = { id };

  const response = await axios.post(URL, data, { headers });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 201 && responseJSON.data) {
    return JSON.parse(JSON.stringify(responseJSON.data));
  }

  return null;
};

// Get Requested Reseller
const apiGetRequestedReseller = async () => {
  const user = await getUserData();

  const URL = `${BASE_URL}${API_REQUESTED_RESELLER}`;
  const headers = {
    Authorization: user.token,
  };
  const response = await axios.get(URL, {
    headers,
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

// Get Active Reseller
const apiGetActiveReseller = async () => {
  const user = await getUserData();

  const URL = `${BASE_URL}${API_ACTIVE_RESELLER}`;
  const headers = {
    Authorization: user.token,
  };
  const response = await axios.get(URL, {
    headers,
  });

  const responseJSON = JSON.parse(JSON.stringify(response));

  if (responseJSON.status === 200 && responseJSON.data) {
    return JSON.parse(JSON.stringify(response.data));
  }

  return null;
};

export {
  apiPostBecomeReseller,
  apiPostAcceptReseller,
  apiGetRequestedReseller,
  apiGetActiveReseller,
};
