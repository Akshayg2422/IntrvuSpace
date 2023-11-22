// import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, CREATE_SECTOR, CREATE_SECTOR_FAILURE, CREATE_SECTOR_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT } from '../ActionTypes';

import { AuthProps } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'


const initialState: AuthProps = {
    registerDetails: undefined,
    loginUser: undefined,
    OTP: undefined,
    memberUsingLoginOtp: undefined,
    registerCompanyDetails: undefined,
    verifyOtp: undefined,
    VerificationEmail: undefined,
    userEmail: undefined,
    dashboardDetails: undefined
};


const AuthReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case ActionTypes.REGISTER_AS_MEMBER:
            state = { ...state, registerDetails: undefined };
            break;
        case ActionTypes.REGISTER_AS_MEMBER_SUCCESS:
            state = { ...state, registerDetails: action.payload };
            break;
        case ActionTypes.REGISTER_AS_MEMBER_FAILURE:
            state = { ...state, registerDetails: undefined };
            break;


        //get otp

        case ActionTypes.FETCH_OTP:
            state = { ...state, OTP: undefined };
            break;
        case ActionTypes.FETCH_OTP_SUCCESS:
            state = { ...state, OTP: action.payload };
            break;
        case ActionTypes.FETCH_OTP_FAILURE:
            state = { ...state, OTP: undefined };
            break;


        //get member using login otp

        case ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP:
            state = { ...state, memberUsingLoginOtp: undefined };
            break;
        case ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP_SUCCESS:
            state = { ...state, memberUsingLoginOtp: action.payload };
            break;
        case ActionTypes.FETCH_MEMBER_USING_LOGIN_OTP_FAILURE:
            state = { ...state, memberUsingLoginOtp: undefined };
            break;


        /**
         * get Dashboard 
         */

        case ActionTypes.GET_DASHBOARD:
            state = { ...state, dashboardDetails: undefined };
            break;
        case ActionTypes.GET_DASHBOARD_SUCCESS:
            state = { ...state, dashboardDetails: action.payload };
            break;
        case ActionTypes.GET_DASHBOARD_FAILURE:
            state = { ...state, dashboardDetails: undefined };
            break;


        /**
         * save user email
         */

        case ActionTypes.SAVE_USER_EMAIL:

            state = { ...state, userEmail: action.payload };
            break;


        default:
            state = state;
            break;



    }

    return state;
};

export { AuthReducer };
