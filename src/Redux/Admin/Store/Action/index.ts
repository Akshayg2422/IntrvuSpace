import * as ActionTypes from '../ActionTypes'

/**
 * get api action candidates
 */

export const getCandidates = (params: any) => {
    return {
        type: ActionTypes.GET_CANDIDATES,
        payload: params,
    };
};

export const getCandidatesSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_CANDIDATES_SUCCESS,
        payload: response
    }
}



export const getCandidatesFailure = (error: any) => {
    return {
        type: ActionTypes.GET_CANDIDATES_FAILURE,
        payload: error
    }
}





/**
 * adi Api action candidates
 */


export const addCandidate = (params: any) => {
    return {
        type: ActionTypes.ADD_CANDIDATES,
        payload: params,
    };
};

/*
getJdSection
*/

export const getJdSection = (params: any) => {
    return {
        type: ActionTypes.GET_JD_SECTION,
        payload: params,
    };
};

export const getJdSectionSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_JD_SECTION_SUCCESS,
        payload: response
    }
}



export const getJdSectionFailure = (error: any) => {
    return {
        type: ActionTypes.GET_JD_SECTION_FAILURE,
        payload: error
    }
}




/**
 * get corporate schedules lite
 */

export const getCorporateSchedulesLite = (params: any) => {
    return {
        type: ActionTypes.GET_CORPORATE_SCHEDULES_LITE,
        payload: params
    }
}


export const getCorporateSchedulesLiteSuccess = (params: any) => {
    return {
        type: ActionTypes.GET_CORPORATE_SCHEDULES_LITE_SUCCESS,
        payload: params
    }
}




export const getCorporateSchedulesLiteFailure = (error: any) => {
    return {
        type: ActionTypes.GET_CORPORATE_SCHEDULES_LITE_FAILURE,
        payload: error
    }
}


export const updatedCorporateSchedulesLite = (error: any) => {
    return {
        type: ActionTypes.UPDATE_CORPORATE_SCHEDULES_LITE,
        payload: error
    }
}







//  =======================================ADD=====================================


/**
 * add candidate corporate lite
 */

export const addCandidateCorporateLite = (params: any) => {
    return {
        type: ActionTypes.ADD_CANDIDATE_CORPORATE_LITE,
        payload: params
    }
}


/**
 * create corporate opening lite
 */

export const createCorporateOpeningLite = (params: any) => {
    return {
        type: ActionTypes.CREATE_CORPORATE_OPENING_LITE,
        payload: params
    }
}

/*
record Authentication Video
*/

export const postRecordAuthenticationVideo = (params: any) => {
    return {
        type: ActionTypes.POST_RECORD_AUTHENTICATION_VIDEO,
        payload: params,
    };
};
