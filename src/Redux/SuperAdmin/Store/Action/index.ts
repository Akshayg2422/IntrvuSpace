import * as ActionTypes from '../ActionTypes'
/**
 * get companies
 */

export const getCompanies = (params: any) => {
    return {
        type: ActionTypes.GET_COMPANIES,
        payload: params,
    };
};

export const getCompaniesSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_COMPANIES_SUCCESS,
        payload: response
    }
}

export const getCompaniesFailure = (error: any) => {
    return {
        type: ActionTypes.GET_COMPANIES_FAILURE,
        payload: error
    }
}

/**
 * alter company status
 */

export const alterCompanyStatus = (params: any) => {
  return {
      type: ActionTypes.ALTER_COMPANY_STATUS,
      payload: params,
  };
};

/**
 * alter company limit
 */

export const alterCompanyLimit = (params: any) => {
  return {
      type: ActionTypes.ALTER_COMPANY_LIMIT,
      payload: params,
  };
};
