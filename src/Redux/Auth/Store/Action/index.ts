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
