import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, CREATE_SECTOR, CREATE_SECTOR_FAILURE, CREATE_SECTOR_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT } from '../ActionTypes';

import { DashboardProp } from '../../Interfaces';
import * as ActionTypes from '../ActionTypes'


const initialState: DashboardProp = {
  userLoggedIn: false,
  chat: [],
  GroupDetails: undefined,
  selectedRole: undefined,
  knowledgeGroups: undefined,
  sectors: undefined,
  questions: undefined,
  selectedClientSector: undefined,
  questionSection: undefined,
  selectedQuestionForm: undefined,
  formSectionQuestions: undefined,
  basicReport: undefined,
  myPastInterviews: undefined,
  scheduleId: undefined,
  generateQuestionSections: undefined,
  generateSectionsAndQuestions: undefined,
  questionDetails: undefined,
  registerData: undefined
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

    case ActionTypes.SET_SELECTED_ROLE:
      state = { ...state, selectedRole: action.payload }
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

    // GET QUESTION FORM

    case ActionTypes.GET_QUESTIONS_FORM:
      state = { ...state, questions: undefined };
      break;
    case ActionTypes.GET_QUESTIONS_FORM_SUCCESS:
      state = { ...state, questions: action.payload.details?.question_forms };
      break;
    case ActionTypes.GET_QUESTIONS_FORM_FAILURE:
      state = { ...state, questions: undefined };
      break;

    // GET QUESTION SECTIONS

    case ActionTypes.GET_QUESTION_SECTION:
      state = { ...state, questionSection: undefined };
      break;
    case ActionTypes.GET_QUESTION_SECTION_SUCCESS:
      state = { ...state, questionSection: action.payload.details?.sections };
      break;
    case ActionTypes.GET_QUESTION_SECTION_FAILURE:
      state = { ...state, questionSection: undefined };
      break;

    //selected Question Form

    case ActionTypes.SET_SELECTED_QUESTION_FORM:
      state = { ...state, selectedQuestionForm: action.payload }
      break;

    //GET_FORM_SECTION_QUESTIONS

    case ActionTypes.GET_FORM_SECTION_QUESTIONS:
      state = { ...state, formSectionQuestions: undefined };
      break;
    case ActionTypes.GET_FORM_SECTION_QUESTIONS_SUCCESS:
      state = { ...state, formSectionQuestions: action.payload.details?.questions };
      break;
    case ActionTypes.GET_FORM_SECTION_QUESTIONS_FAILURE:
      state = { ...state, formSectionQuestions: undefined };
      break;



    //FETCH_BASIC_REPORT

    case ActionTypes.FETCH_BASIC_REPORT:
      state = { ...state, basicReport: undefined };
      break;
    case ActionTypes.FETCH_BASIC_REPORT_SUCCESS:
      state = { ...state, basicReport: action.payload.details };
      break;
    case ActionTypes.FETCH_BASIC_REPORT_FAILURE:
      state = { ...state, basicReport: undefined };
      break;

    // MyPastInterviews
    case ActionTypes.GET_MY_PAST_INTERVIEWS:
      state = { ...state, myPastInterviews: undefined };
      break;
    case ActionTypes.GET_MY_PAST_INTERVIEWS_SUCCESS:
      state = { ...state, myPastInterviews: action.payload.details?.schedules };
      break;
    case ActionTypes.GET_MY_PAST_INTERVIEWS_FAILURE:
      state = { ...state, myPastInterviews: undefined };
      break;

    // Selected Schedule Id

    case ActionTypes.SELECTED_SCHEDULE_ID:
      state = { ...state, scheduleId: action.payload };
      break;

    // GENERATE_SECTION_QUESTIONS

    case ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS:
      state = { ...state, generateQuestionSections: undefined };
      break;
    case ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS_SUCCESS:
      state = { ...state, generateQuestionSections: action.payload.details };
      break;
    case ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS_FAILURE:
      state = { ...state, generateQuestionSections: undefined };
      break;

    // GENERATE_FORM_SECTIONS_AND_QUESTIONS 

    case ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS:
      state = { ...state, generateSectionsAndQuestions: undefined };
      break;
    case ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS_SUCCESS:
      state = { ...state, generateSectionsAndQuestions: action.payload.details };
      break;
    case ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS_FAILURE:
      state = { ...state, generateSectionsAndQuestions: undefined };
      break;

    // FETCH_UPDATE_QUESTION_DETAILS

    case ActionTypes.FETCH_UPDATE_QUESTION_DETAILS:
      state = { ...state, questionDetails: undefined };
      break;
    case ActionTypes.FETCH_UPDATE_QUESTION_DETAILS_SUCCESS:
      state = { ...state, questionDetails: action.payload.details };
      break;
    case ActionTypes.FETCH_UPDATE_QUESTION_DETAILS_FAILURE:
      state = { ...state, questionDetails: undefined };
      break;

    // GET REGISTER DATA
    case ActionTypes.GET_REGISTER_DATA:
      state = { ...state, registerData: action.payload };
      break;

    default:
      state = state;
      break;

  }

  return state;
};

export { DashboardReducer };
