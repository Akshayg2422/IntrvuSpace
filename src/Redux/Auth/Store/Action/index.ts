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

export const memberLoginUsingPasswordSuccess = (response: any) => {

    return {
        type: ActionTypes.MEMBER_LOGIN_USING_PASSWORD_SUCCESS,
        payload: response
    }
}

export const memberLoginUsingPasswordFailure = (error: any) => {
    return {
        type: ActionTypes.MEMBER_LOGIN_USING_PASSWORD_FAILURE,
        payload: error
    }
}



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

export const registerAsCompanySuccess = (response: any) => {

    return {
        type: ActionTypes.REGISTER_AS_COMPANY_SUCCESS,
        payload: response
    }
}

export const registerAsCompanyFailure = (error: any) => {
    return {
        type: ActionTypes.REGISTER_AS_COMPANY_FAILURE,
        payload: error
    }
}


//GET_OTP_FOR_EMAIL_VERIFICATION

export const getOtpForEmailVerification = (params: any) => {
    return {
        type: ActionTypes.GET_OTP_FOR_EMAIL_VERIFICATION,
        payload: params,
    };
};

export const getOtpForEmailVerificationSuccess = (response: any) => {

    return {
        type: ActionTypes.GET_OTP_FOR_EMAIL_VERIFICATION_SUCCESS,
        payload: response
    }
}

export const getOtpForEmailVerificationFailure = (error: any) => {
    return {
        type: ActionTypes.GET_OTP_FOR_EMAIL_VERIFICATION_FAILURE,
        payload: error
    }
}



//GEMAIL_VERIFICATION

export const verifyEmailUsingOtp = (params: any) => {
    return {
        type: ActionTypes.VERIFY_EMAIL_USING_OTP,
        payload: params,
    };
};

export const verifyEmailUsingOtpSuccess = (response: any) => {

    return {
        type: ActionTypes.VERIFY_EMAIL_USING_OTP_SUCCESS,
        payload: response
    }
}

export const verifyEmailUsingOtpFailure = (error: any) => {
    return {
        type: ActionTypes.VERIFY_EMAIL_USING_OTP_FAILURE,
        payload: error
    }
}


export const fetchEmailVerify = (params: any) => {
    return {
        type: ActionTypes.FETCH_EMAIL_VERIFY,
        payload: params
    }
}