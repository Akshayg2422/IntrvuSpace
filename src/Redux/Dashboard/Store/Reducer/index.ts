import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, CREATE_SECTOR, CREATE_SECTOR_FAILURE, CREATE_SECTOR_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT } from '../ActionTypes';

import { DashboardProp } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'


const initialState: DashboardProp = {
  userLoggedIn: false,
  chat: [],
  GroupDetails: undefined,
  selectedGroupId: undefined,
  knowledgeGroups: undefined,
  sectors: undefined,
  questionForm: undefined,
  selectedClientSector: undefined
};

const DashboardReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case ActionTypes.GET_START_CHAT:
      state = {
        ...state,
        chat: action.payload
      };
      break;

    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state, };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE:
      state = { ...state };
      break;


    case ActionTypes.CREATE_KNOWLEDGE_GROUP:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_SUCCESS:
      state = { ...state, };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;


    case ActionTypes.GET_KNOWLEDGE_GROUP:
      state = { ...state, knowledgeGroups: undefined };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_SUCCESS:
      state = { ...state, knowledgeGroups: action.payload.details.knowledege_groups };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;


    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state, };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_FAILURE:
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
    //selected Group Id

    case ActionTypes.SELECTED_GROUP_ID:
      state = { ...state, selectedGroupId: action.payload }
      break;


    /**
     * get sectors
     */

    case ActionTypes.GET_SECTORS:
      state = { ...state, sectors: undefined };
      break;
    case ActionTypes.GET_SECTORS_SUCCESS:
      state = { ...state, sectors: action.payload.details?.knowledege_groups };
      break;
    case ActionTypes.GET_SECTORS_FAILURE:
      state = { ...state, sectors: undefined };
      break;

    //create question form
    case ActionTypes.CREATE_QUESTION_FORM:
      state = { ...state };
      break;
    case ActionTypes.CREATE_QUESTION_FORM_SUCCESS:
      state = { ...state, };
      break;
    case ActionTypes.CREATE_QUESTION_FORM_FAILURE:
      state = { ...state };
      break;



    /**
 *  set client sectors
 */

    case ActionTypes.SET_CLIENT_SECTORS:
      state = { ...state, selectedClientSector: action.payload };
      break;


    default:
      state = state;
      break;

  }

  return state;
};

export { DashboardReducer };
