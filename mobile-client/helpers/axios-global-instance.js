import { getToken } from './tokenStorage';
import constants from 'expo-constants';
const { manifest } = constants;
import axios from 'axios';

const LOCAL_API_URL =
  manifest && manifest.debuggerHost
    ? `http://${manifest.debuggerHost.split(':').shift()}:5000`
    : '';

console.log('API URL', LOCAL_API_URL, axios.defaults.baseURL);
const axiosInstance = axios.create({
  baseURL: `https://server-guderiane.vercel.app/`,
  // baseURL: LOCAL_API_URL,
});
const loadTokenIntoHeaders = async () => {
  // grab token from secureStore
  const accessToken = await getToken('accessToken');
  const refreshToken = await getToken('refreshToken');
  axios.defaults.headers.accessToken = accessToken;
  axios.defaults.headers.refreshToken = refreshToken;
};

export default axiosInstance;
