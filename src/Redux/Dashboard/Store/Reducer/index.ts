import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, CREATE_SECTOR, CREATE_SECTOR_FAILURE, CREATE_SECTOR_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT } from '../ActionTypes';
import { DashboardProp } from '../../Interfaces';


const initialState: DashboardProp = {
  userLoggedIn: false,
  chat: [],
  GroupDetails: undefined
};

const DashboardReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case GET_START_CHAT:
      state = {
        ...state,
        chat: action.payload
      };
      break;

    case CREATE_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state, };
      break;
    case CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE:
      state = { ...state };
      break;


    case CREATE_KNOWLEDGE_GROUP:
      state = { ...state };
      break;
    case CREATE_KNOWLEDGE_GROUP_SUCCESS:
      state = { ...state, };
      break;
    case CREATE_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;


    case GET_KNOWLEDGE_GROUP:
      state = { ...state, GroupDetails: undefined };
      break;
    case GET_KNOWLEDGE_GROUP_SUCCESS:
      state = { ...state, GroupDetails: action.payload };
      break;
    case GET_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;


    case GET_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state, };
      break;
    case GET_KNOWLEDGE_GROUP_VARIANT_FAILURE:
      state = { ...state };
      break;

    // CreateSector

    case CREATE_SECTOR:
      state = { ...state };
      break;
    case CREATE_SECTOR_SUCCESS:
      state = { ...state, };
      break;
    case CREATE_SECTOR_FAILURE:
      state = { ...state };
      break;

    default:
      state = state;
      break;

  }

  return state;
};

export { DashboardReducer };
