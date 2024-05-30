import { USER_LOGIN_DETAILS, RESTORE_APP, USER_LOGOUT, HANDLING_API, FCM_TOKEN } from '../ActionTypes';



export const userLoginDetails = (params: any) => {
  return {
    type: USER_LOGIN_DETAILS,
    payload: params,
  };
};
export const restoreApp = () => {
  return {
    type: RESTORE_APP,
  };
};

export const userLogout = (params: any) => {
  return {
    type: USER_LOGOUT,
    payload: params,
  };
};

export const setIsSync = (params: any) => {
  return {
    type: HANDLING_API,
    payload: params,
  };
};

export const setFcmToken = (token: any) => {
  return {
    type: FCM_TOKEN,
    payload: token,
  };
};