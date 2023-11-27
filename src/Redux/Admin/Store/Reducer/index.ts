/* eslint-disable no-self-assign */
import { AdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: AdminProps = {

};

const AdminReducer = (state = initialState, action: any) => {
  switch (action.type) {

    /**
 * get companies 
 */

    case ActionTypes:

      state = {
        ...state
      };
      break;

  
    default:
      state = state;
      break;
  }

  return state;
};

export {AdminReducer};
