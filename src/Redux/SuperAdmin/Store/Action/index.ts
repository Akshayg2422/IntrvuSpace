import * as ActionTypes from "../ActionTypes";
export const getCompanies= (params: any) => {
    return {
      type: ActionTypes.GET_COMPANIES,
      payload: params,
    };
  };
  export const getCompaniesSuccess = (response: any) => {
    return {
      type: ActionTypes.GET_COMPANIES_SUCCESS,
      payload: response,
    };
  };
  
  export const getCompaniesFailure = (error: any) => {
    return {
      type: ActionTypes.GET_COMPANIES_FAILURE,
      payload: error,
    };
  };
  