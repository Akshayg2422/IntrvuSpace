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


/**
 * get ongoing schedules
 */


export const getOngoingSchedules = (params: any) => {
    return {
        type: ActionTypes.FETCH_ONGOING_SCHEDULES,
        payload: params,
    };
};


export const getOngoingSchedulesSuccess = (response: any) => {
    return {
        type: ActionTypes.FETCH_ONGOING_SCHEDULES_SUCCESS,
        payload: response,
    };
};

export const getOngoingSchedulesFailure = (error: any) => {
    return {
        type: ActionTypes.FETCH_ONGOING_SCHEDULES_FAILURE,
        payload: error,
    };
};

/**
 * set ongoing schedule
 */

export const setSelectedOngoingSchedule = (selected: any) => {
    return {
        type: ActionTypes.SET_SELECTED_ONGOING_SCHEDULE,
        payload: selected,
    };
};


/**
 * VIEW COMPANY INTERVIEW
 */

export const setSelectedCompanyId = (selectedId: any) => {
    return {
        type: ActionTypes.VIEW_COMPANY_INTERVIEW,
        payload: selectedId,
    };
};


/* POST super admin report reGenerate */

export const fetchGenerateReport = (params: any) => {
    return {
        type: ActionTypes.FETCH_GENERATE_REPORT,
        payload: params,
    };
};


export const fetchGenerateReportSuccess = (response: any) => {
    return {
        type: ActionTypes.FETCH_GENERATE_REPORT_SUCCESS,
        payload: response,
    };
};

export const fetchGenerateReportFailure = (error: any) => {
    return {
        type: ActionTypes.FETCH_GENERATE_REPORT_FAILURE,
        payload: error,
    };
};
