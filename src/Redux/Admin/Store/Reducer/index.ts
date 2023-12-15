/* eslint-disable no-self-assign */
import { AdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: AdminProps = {
  candidates: undefined,
  candidatesNumOfPages: undefined,
  candidatesCurrentPages: 1,
  jdSection: [],
  schedulesLite: [],
  schedulesLiteNumOfPages: undefined,
  schedulesLiteCurrentPage: 1,
  schedulesLiteCount: -1
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

    case ActionTypes.GET_JD_SECTION:
      state = { ...state, jdSection: undefined };
      break;

    case ActionTypes.GET_JD_SECTION_SUCCESS:
      state = { ...state, jdSection: action.payload?.details?.jd_sections };
      break;

    case ActionTypes.GET_JD_SECTION_FAILURE:
      state = { ...state, jdSection: undefined };
      break;

    /**
     * get corporate schedules lite
     */

    case ActionTypes.GET_CORPORATE_SCHEDULES_LITE:

      state = {
        ...state,
        schedulesLite: undefined,
        schedulesLiteNumOfPages: undefined,
        schedulesLiteCurrentPage: 1
      };
      break;

    case ActionTypes.GET_CORPORATE_SCHEDULES_LITE_SUCCESS:

      const { corporate_jd_items, schedule_count } = action.payload?.details
      const modifiedJd = corporate_jd_items?.data || corporate_jd_items

      console.log(action.payload);

      state = {
        ...state,
        schedulesLiteCount: schedule_count,
        schedulesLite: modifiedJd,
        schedulesLiteNumOfPages: corporate_jd_items?.num_pages,
        schedulesLiteCurrentPage:
          corporate_jd_items.next_page === -1
            ? corporate_jd_items.num_pages
            : corporate_jd_items.next_page - 1,
      };

      break;

    case ActionTypes.GET_CORPORATE_SCHEDULES_LITE_FAILURE:
      state = { ...state, schedulesLite: undefined };
      break;

    case ActionTypes.UPDATE_CORPORATE_SCHEDULES_LITE:
      state = { ...state, schedulesLite: action.payload };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export { AdminReducer };
