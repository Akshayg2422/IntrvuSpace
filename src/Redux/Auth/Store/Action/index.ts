import * as ActionTypes from '../ActionTypes'




export const registerAsMember = (params: any) => {
    return {
        type: ActionTypes.REGISTER_AS_MEMBER,
        payload: params,
    };
};

export const registerAsMemberSuccess = (response: any) => {

    return {
        type: ActionTypes.REGISTER_AS_MEMBER_SUCCESS,
        payload: response
    }
}

export const registerAsMemberFailure = (error: any) => {
    return {
        type: ActionTypes.REGISTER_AS_MEMBER_FAILURE,
        payload: error
    }
}

// memberLoginUsingPassword

export const memberLoginUsingPassword = (params: any) => {
    return {
        type: ActionTypes.MEMBER_LOGIN_USING_PASSWORD,
        payload: params,
    };
};




// get otp

export const fetchOTP = (params: any) => {
    return {
        type: ActionTypes.FETCH_OTP,
        payload: params,
    };
};

export const fetchOTPSuccess = (response: any) => {

    return {
        type: ActionTypes.FETCH_OTP_SUCCESS,
        payload: response
    }
}

export const fetchOTPFailure = (error: any) => {
    return {
        type: ActionTypes.FETCH_OTP_FAILURE,
        payload: error
    }
}


// get member login using otp

export const fetchMemberUsingLoginOtp = (params: any) => {
    return {
        type: ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP,
        payload: params,
    };
};

export const fetchMemberUsingLoginOtpSuccess = (response: any) => {

    return {
        type: ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP_SUCCESS,
        payload: response
    }
}

export const fetchMemberUsingLoginOtpFailure = (error: any) => {
    return {
        type: ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP_FAILURE,
        payload: error
    }
}

// registerAsCompany

export const registerAsCompany = (params: any) => {
    return {
        type: ActionTypes.REGISTER_AS_COMPANY,
        payload: params,
    };
};

export const saveUserEmail = (params: any) => {
    return {
        type: ActionTypes.SAVE_USER_EMAIL,
        payload: params
    }
}

/**
 *  get oto from email verification
 * @param params 
 * @returns 
 */

export const getOtpForEmailVerification = (params: any) => {
    return {
        type: ActionTypes.GET_OTP_FOR_EMAIL_VERIFICATION,
        payload: params,
    };
};




/**
 *  verify email using otp
 */

export const verifyEmailUsingOtp = (params: any) => {
    return {
        type: ActionTypes.VERIFY_EMAIL_USING_OTP,
        payload: params,
    };
};


/**
 * get DASHBOARD
 */



export const getDashboard = (params: any) => {
    return {
        type: ActionTypes.GET_DASHBOARD,
        payload: params,
    };
};

export const getDashboardSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_DASHBOARD_SUCCESS,
        payload: response
    }
}

export const getDashboardFailure = (error: any) => {
    return {
        type: ActionTypes.GET_DASHBOARD_FAILURE,
        payload: error
    }
}



/**
 * create company Super admin
 */

export const createCompanySuperAdmin = (params: any) => {
    return {
        type: ActionTypes.CREATE_COMPANY_SUPER_ADMIN,
        payload: params,
    };
};


/**
 * switch to Advance
 */

export const switchToAdvance = (params: any) => {
    return {
        type: ActionTypes.SWITCH_TO_ADVANCE,
        payload: params,
    };
};

/**
 * log out
 */

export const submitLogout = (params: any) => {
    return {
        type: ActionTypes.LOGOUT,
        payload: params,
    };
};
