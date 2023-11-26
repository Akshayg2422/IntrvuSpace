/* eslint-disable no-self-assign */
import { SuperAdminProps } from "../../Interfaces";
import * as ActionTypes from '../ActionTypes'

const initialState: SuperAdminProps = {
  companies: [],
  companiesNumOfPages: undefined,
  companiesCurrentPages: 1
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


    default:
      state = state;
      break;
  }

  return state;
};

export { SuperAdminReducer };
