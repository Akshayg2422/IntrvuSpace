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

/*
 get recent interviews
 */
export const getRecentInterviews = (params: any) => {
    return {
        type: ActionTypes.GET_RECENT_INTERVIEWS,
        payload: params,
    };
};

export const getRecentInterviewsSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_RECENT_INTERVIEWS_SUCCESS,
        payload: response
    }
}

export const getRecentInterviewsFailure = (error: any) => {
    return {
        type: ActionTypes.GET_RECENT_INTERVIEWS_FAILURE,
        payload: error
    }
}



/**
 *  selcted companies
 */


export const setSelectedCompany = (item: any) => {
    return {
        type: ActionTypes.SELECTED_COMPANY,
        payload: item,
    };
};