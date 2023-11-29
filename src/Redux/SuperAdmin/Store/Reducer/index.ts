/* eslint-disable no-self-assign */
import { SuperAdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: SuperAdminProps = {
  companies: [],
  companiesNumOfPages: undefined,
  companiesCurrentPages: 1,
  recentInterviews: [],
  recentInterviewsNumOfPages: undefined,
  recentInterviewsCurrentPages: 1,
  selectedCompany: undefined
};

const SuperAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {

    /**
 * get companies 
 */

    case ActionTypes.GET_COMPANIES:

      state = {
        ...state,
        companies: undefined,
        companiesNumOfPages: 0,
        companiesCurrentPages: 1
      };
      break;
    case ActionTypes.GET_COMPANIES_SUCCESS:

      const { companies } = action.payload?.details
      const modifiedCompanies = companies?.data || companies

      state = {
        ...state,
        companies: modifiedCompanies,
        companiesNumOfPages: companies?.num_pages,
        companiesCurrentPages:
          companies.next_page === -1
            ? companies.num_pages
            : companies.next_page - 1,
      };
      break;
    case ActionTypes.GET_COMPANIES_FAILURE:
      state = { ...state, companies: undefined };
      break;

    /*
    get recent interviews
    */
    case ActionTypes.GET_RECENT_INTERVIEWS:
      state = { ...state, recentInterviews: undefined };
      break;

    case ActionTypes.GET_RECENT_INTERVIEWS_SUCCESS:
      const { recent_interviews } = action.payload?.details
      const modifiedRecentInterviews = recent_interviews?.data || recent_interviews
      state = {
        ...state,
        recentInterviews: modifiedRecentInterviews,
        recentInterviewsNumOfPages: recent_interviews?.num_pages,
        recentInterviewsCurrentPages:
          recent_interviews?.next_page === -1
            ? recent_interviews?.num_pages
            : recent_interviews?.next_page - 1
      };
      break;
    case ActionTypes.GET_RECENT_INTERVIEWS_FAILURE:
      state = { ...state, recentInterviews: undefined };
      break;



    /**
     * get slelectd company
     */

    case ActionTypes.SELECTED_COMPANY:
      state = { ...state, selectedCompany: action.payload };
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export { SuperAdminReducer };
