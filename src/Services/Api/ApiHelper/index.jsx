/* eslint-disable react-hooks/rules-of-hooks */
import { store, userLogout } from "@Redux";
import { USER_TOKEN } from '@Utils';
import axios from 'axios';



export const BUILD_TYPE_LIVE = 1;
export const BUILD_TYPE_LIVE_DEMO = 2;
export const BUILD_TYPE_STAGING = 3;
export const BUILD_TYPE_LOCAL = 4;
export const BUILD_TYPE_PRE_PROD_IP = 5;


const LIVE_IP = "https://mockeazyprimary.leorainfotech.in"
const PRE_PROD_IP = "https://mepp.leorainfotech.in"
const LOCAL_IP = "http://192.168.128.126:8006"


export const BUILD_TYPE = BUILD_TYPE_PRE_PROD_IP;


export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? LIVE_IP
    : BUILD_TYPE === BUILD_TYPE_PRE_PROD_IP
      ? PRE_PROD_IP
      : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
        ? "https://9c0d-103-118-191-250.ngrok-free.app/"
        : BUILD_TYPE === BUILD_TYPE_LOCAL
          ? LOCAL_IP
          : BUILD_TYPE === BUILD_TYPE_STAGING
            ? 'http://103.118.31.111:8005'
            : 'http://localhost:8000'



// export const CALL_WEBSOCKET = `wss://mockeazyprimary.leorainfotech.in/aaa`
  export const CALL_WEBSOCKET = `wss://mepp.leorainfotech.in/aaa`

// export const CALL_WEBSOCKET = `ws://192.168.111.126:8009/aaa`


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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          try {
            store.dispatch(
              userLogout({
                onSuccess: () => {
                  window.location.href = '/login';
                },
                onError: () => {
                },
              }));
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('Error status:', error.response.status);
          console.log('Error data:', error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
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

