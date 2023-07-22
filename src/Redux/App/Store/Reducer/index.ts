import { USER_LOGIN_DETAILS, RESTORE_APP, HANDLING_API, FCM_TOKEN } from '../ActionTypes';
import { AppStateProp } from '../../Interfaces';


const initialState: AppStateProp = {

  userLoggedIn: false,
  loginDetails: undefined,
  isSync: { issues: false, tasks: false, companies: false, broadcast: false, dashboardDetails: false },
  token: undefined
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESTORE_APP:
      state = initialState;
      break;
    case USER_LOGIN_DETAILS:
      state = {
        ...state,
        loginDetails: { ...state.loginDetails, ...action.payload },
      };
      break;
    case HANDLING_API:
      state = {
        ...state,
        isSync: action.payload,
      };
      break;
    case FCM_TOKEN:
      state = {
        ...state,
        token: action.payload
      };
      break;
    default:
      state = state;
      break;

  }

  return state;
};

export { AppReducer };
