import axios from 'axios';
import { USER_TOKEN } from '@Utils'


export const BUILD_TYPE_LIVE = 1;
export const BUILD_TYPE_LIVE_DEMO = 2;
export const BUILD_TYPE_STAGING = 3;
export const BUILD_TYPE_LOCAL = 4;
export const BUILD_TYPE_PRE_PROD_IP = 5;


const LIVE_IP = "https://mockeazyprimary.leorainfotech.in"
const PRE_PROD_IP = "https://mepp.leorainfotech.in"
const LOCAL_IP = "http://192.168.10.5:8004"




export const BUILD_TYPE = BUILD_TYPE_PRE_PROD_IP;

export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? LIVE_IP
    : BUILD_TYPE === BUILD_TYPE_PRE_PROD_IP
      ? PRE_PROD_IP
      : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
        ? 'https://2807-103-118-190-6.ngrok-free.app/'
        : BUILD_TYPE === BUILD_TYPE_LOCAL
          ? LOCAL_IP
          : BUILD_TYPE === BUILD_TYPE_STAGING
            ? 'http://103.118.188.135:8005'
            : 'http://localhost:8000'



// export const CALL_WEBSOCKET = `wss://mockeazyprimary.leorainfotech.in/aaa`
export const CALL_WEBSOCKET = `wss://mepp.leorainfotech.in/aaa`

// export const CALL_WEBSOCKET = `ws://192.168.10.5:8004/aaa`


const axiosApi = axios.create({
  baseURL: SERVER,
});


axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {

    const value = await localStorage.getItem(USER_TOKEN);
    if (value) {
      return { Authorization: 'Token ' + value };
    } else {
      return {};
    }
  } catch {
    return {};
  }
};

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: await getHeaders(),
    })
    .then(response => response.data);
}

export async function post(url, data, config, submissionUrl) {

  submissionUrl = submissionUrl || SERVER

  const baseUrl = axios.create({
    baseURL: submissionUrl,
    timeout: 240000, // 4 minutes
  });


  let headers = { ...(await getHeaders()) };

  return await baseUrl
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {

    });
}

export async function postHeader(url, data, config) {
  let headers = { ...(await getHeaders()) };
  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response;
    });
}

