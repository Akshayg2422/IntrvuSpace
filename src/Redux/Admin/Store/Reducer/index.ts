/* eslint-disable no-self-assign */
import { AdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: AdminProps = {

  candidatesList:undefined,
  candidatesNumOfPages:undefined,
  candidatesCurrentPages:1,


};

const AdminReducer = (state = initialState, action: any) => {
  switch (action.type) {

    /**
 *ActionTypes.variable of actionType we have to mention
 */

    case ActionTypes.GET_CANDIDATES:

      state = {
        ...state,
        candidatesList: undefined,
        candidatesNumOfPages: undefined,
        candidatesCurrentPages: 1
      };
      break;
    case ActionTypes.GET_CANDIDATES_SUCCESS:

      const { candidates } = action.payload?.details
      const modifiedCandidates = candidates?.data || candidates

      state = {
        ...state,
        candidatesList: modifiedCandidates,
        candidatesNumOfPages: candidates?.num_pages,
        candidatesCurrentPages:
        candidates.next_page === -1
            ? candidates.num_pages
            : candidates.next_page - 1,
      };
      break;
    case ActionTypes.GET_CANDIDATES_FAILURE:
      state = { ...state, candidatesList: undefined };
      break;

   


  
    default:
      state = state;
      break;
  }

  return state;
};

export {AdminReducer};
