// import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, CREATE_SECTOR, CREATE_SECTOR_FAILURE, CREATE_SECTOR_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT } from '../ActionTypes';

import { AuthProps } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'


const initialState: AuthProps = {
    registerDetails: undefined,
    loginUser: undefined,
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

        //memberLoginUsingPassword

        case ActionTypes.MEMBER_LOGIN_USING_PASSWORD:
            state = { ...state, loginUser: undefined };
            break;
        case ActionTypes.MEMBER_LOGIN_USING_PASSWORD_SUCCESS:
            state = { ...state, loginUser: action.payload };
            break;
        case ActionTypes.MEMBER_LOGIN_USING_PASSWORD_FAILURE:
            state = { ...state, loginUser: undefined };
            break;

        default:
            state = state;
            break;

    }

    return state;
};

export { AuthReducer };
