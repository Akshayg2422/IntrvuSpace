/* eslint-disable no-self-assign */
import { AdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: AdminProps = {

  candidates:undefined,
  candidatesNumOfPages:undefined,
  candidatesCurrentPages:1,
  jdSection:[],


};

const AdminReducer = (state = initialState, action: any) => {
  switch (action.type) {

    /**
 * get api only we implement the reducer state else we use the normal state to use to store data not to use to store the add api data 
 */

    case ActionTypes.GET_CANDIDATES:

      state = {
        ...state,
        candidates: undefined,
        candidatesNumOfPages: undefined,
        candidatesCurrentPages: 1
      };
      break;

    case ActionTypes.GET_CANDIDATES_SUCCESS:

      const { candidate_list } = action.payload?.details
      const modifiedCandidates = candidate_list?.data || candidate_list

      state = {
        ...state,
        candidates: modifiedCandidates,
        candidatesNumOfPages: candidate_list?.num_pages,
        candidatesCurrentPages:
        candidate_list.next_page === -1
            ? candidate_list.num_pages
            : candidate_list.next_page - 1,
      };
      break;


    case ActionTypes.GET_CANDIDATES_FAILURE:
      state = { ...state, candidates: undefined };
      break;
   
      //get jd section

      case ActionTypes.GET_JDSECTION:
      state = { ...state, jdSection:undefined };
      break;

      case ActionTypes.GET_JDSECTION_SUCCESS:
      state = { ...state, jdSection:action.payload?.details?.jd_sections};
      break;
      
      case ActionTypes.GET_JDSECTION_FAILURE:
        state = { ...state, jdSection:undefined};
        break;
  

   


  
    default:
      state = state;
      break;
  }

  return state;
};

export {AdminReducer};
