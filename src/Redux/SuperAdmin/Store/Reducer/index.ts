/* eslint-disable no-self-assign */
import { SuperAdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: SuperAdminProps = {
  companies: []
};

const SuperAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {



    /**
 * get companies 
 */

    case ActionTypes.GET_COMPANIES:
      state = { ...state, companies: undefined };
      break;
    case ActionTypes.GET_COMPANIES_SUCCESS:
      state = { ...state, companies: action.payload?.details?.companies };
      break;
    case ActionTypes.GET_COMPANIES_FAILURE:
      state = { ...state, companies: undefined };
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export { SuperAdminReducer };
