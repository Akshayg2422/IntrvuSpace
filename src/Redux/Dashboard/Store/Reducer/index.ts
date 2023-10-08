/* eslint-disable no-self-assign */
import {
  CREATE_SECTOR,
  CREATE_SECTOR_FAILURE,
  CREATE_SECTOR_SUCCESS
} from "../ActionTypes";

import { DashboardProp } from "../../Interfaces";
import * as ActionTypes from "../ActionTypes";

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
  registerData: undefined,
  removeSideNav: false,
  VideoSessionDetails: undefined,
  breadCrumb: [],
  recordingPermission: false,
  jdVariantData: undefined,
  jdItem: undefined,
  scheduleInfo: undefined,
  selectedSection: 0,
  corporateScheduleDetails: undefined,
  loading: false,
  studentCodeOutput: undefined,
  codeOutputData: undefined,
  selectedSectionId: undefined,
  canStartInterview: undefined,
  createJdModal: false,
  sectorsCorporate: undefined,
  departmentCorporate: undefined,
  corporateSchedules:undefined,
};

const DashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_START_CHAT:
      state = {
        ...state,
        chat: action.payload,
      };
      break;

    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.CREATE_KNOWLEDGE_GROUP:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.GET_KNOWLEDGE_GROUP:
      state = { ...state, knowledgeGroups: undefined };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_SUCCESS:
      state = {
        ...state,
        knowledgeGroups: action.payload.details.knowledege_groups,
      };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT:
      state = { ...state };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_FAILURE:
      state = { ...state };
      break;

    // CreateSector

    case CREATE_SECTOR:
      state = { ...state };
      break;
    case CREATE_SECTOR_SUCCESS:
      state = { ...state };
      break;
    case CREATE_SECTOR_FAILURE:
      state = { ...state };
      break;
    //selected Group Id

    case ActionTypes.SET_SELECTED_ROLE:
      state = { ...state, selectedRole: action.payload };
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
      state = { ...state };
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
      state = { ...state, selectedQuestionForm: action.payload };
      break;

    //GET_FORM_SECTION_QUESTIONS

    case ActionTypes.GET_FORM_SECTION_QUESTIONS:
      state = { ...state, formSectionQuestions: undefined };
      break;
    case ActionTypes.GET_FORM_SECTION_QUESTIONS_SUCCESS:
      state = {
        ...state,
        formSectionQuestions: action.payload.details?.questions,
      };
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
      state = {
        ...state,
        generateSectionsAndQuestions: action.payload.details,
      };
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

    // CREATE_SCHEDULE

    case ActionTypes.CREATE_SCHEDULE:
      state = { ...state };
      break;
    case ActionTypes.CREATE_SCHEDULE_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_SCHEDULE_FAILURE:
      state = { ...state };
      break;

    case ActionTypes.REMOVE_SIDE_NAV:
      state = { ...state, removeSideNav: action.payload };
      break;

    case ActionTypes.BREADCRUMBS:
      state = { ...state, breadCrumb: [...state.breadCrumb, action.payload] };
      break;

    case ActionTypes.CLEAR_BREADCRUMBS:
      state = { ...state, breadCrumb: [] };
      break;

    case ActionTypes.SCREEN_RECORDING_PERMISSION:
      state = { ...state, recordingPermission: action.payload };
      break;

    // INTERVIEW_RECORDER_SESSION

    case ActionTypes.INTERVIEW_RECORDER_SESSION:
      state = { ...state };
      break;
    case ActionTypes.INTERVIEW_RECORDER_SESSION_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.INTERVIEW_RECORDER_SESSION_FAILURE:
      state = { ...state };
      break;

    // getRecordedVideoSessionDetails
    case ActionTypes.RECORDING_VIDEO_SESSION_DETAILS:
      state = { ...state, VideoSessionDetails: action.payload };
      break;

    case ActionTypes.POST_JD_VARIANT:
      state = { ...state, jdVariantData: undefined };
      break;

    case ActionTypes.POST_JD_VARIANT_SUCCESS:
      state = { ...state, jdVariantData: action.payload };
      break;

    case ActionTypes.POST_JD_VARIANT_FAILURE:
      state = { ...state, jdVariantData: undefined };
      break;

    // Create a new array without the last element

    case ActionTypes.CLEAR_LAST_BREADCRUMB:
      const updatedBreadCrumb = state.breadCrumb.pop();
      return { ...state, breadCrumb: updatedBreadCrumb };
      break;

    /**
     * get jd item list
     */
    case ActionTypes.GET_JD_ITEM_LIST:
      state = { ...state, jdItem: undefined };
      break;
    case ActionTypes.GET_JD_ITEM_LIST_SUCCESS:
      console.log("==========>", action.payload.details);
      state = { ...state, jdItem: action.payload.details?.jd_items };
      break;
    case ActionTypes.GET_JD_ITEM_LIST_FAILURE:
      state = { ...state, jdItem: undefined };
      break;

    // GET_SCHEDULE_BASIC_INFO

    case ActionTypes.GET_SCHEDULE_BASIC_INFO:
      state = { ...state, scheduleInfo: undefined };
      break;
    case ActionTypes.GET_SCHEDULE_BASIC_INFO_SUCCESS:
      state = {
        ...state,
        scheduleInfo: action.payload?.details?.schedule_details,
      };
      break;
    case ActionTypes.GET_SCHEDULE_BASIC_INFO_FAILURE:
      state = { ...state, scheduleInfo: undefined };
      break;

    // create corporate variant

    case ActionTypes.CREATE_CORPORATE_VARIANT:
      state = { ...state };
      break;
    case ActionTypes.CREATE_CORPORATE_VARIANT_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_CORPORATE_VARIANT_FAILURE:
      state = { ...state };
      break;

    /**
     * set selected section
     */

    case ActionTypes.SET_SELECTED_SECTION:
      state = { ...state, selectedSection: action.payload };
      break;

    // GET_CORPORATE_SCHEDULE_DETAILS

    case ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS:
      state = { ...state, corporateScheduleDetails: undefined };
      break;
    case ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS_SUCCESS:
      state = { ...state, corporateScheduleDetails: action.payload };
      break;
    case ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS_FAILURE:
      state = { ...state, corporateScheduleDetails: undefined };
      break;

    /**
     * Student CODE submission
     */

    case ActionTypes.STUDENT_CODE_SUBMISSION:
      state = { ...state, loading: true };
      break;
    case ActionTypes.STUDENT_CODE_SUBMISSION_SUCCESS:
      state = { ...state, studentCodeOutput: action.payload };
      break;
    case ActionTypes.STUDENT_CODE_SUBMISSION_FAILURE:
      state = { ...state, loading: false };
      break;

    // setting code output data

    case ActionTypes.SETTING_CODE_OUTPUT_DATA:
      state = { ...state, codeOutputData: action.payload };
      break;

    // setting selected section id

    case ActionTypes.SETTING_SELECTED_SECTION_ID:
      state = { ...state, selectedSectionId: action.payload };
      break;

    // open jd modal

    case ActionTypes.SHOW_CREATE_JD_MODAL:
      state = { ...state, createJdModal: true };
      break;


    case ActionTypes.HIDE_CREATE_JD_MODAL:
      state = { ...state, createJdModal: false };
      break;


    /**
     * getSectorsCorporate
     */

    case ActionTypes.GET_SECTORS_CORPORATE:
      state = { ...state, sectorsCorporate: undefined };
      break;

    case ActionTypes.GET_SECTORS_CORPORATE_SUCCESS:
      state = { ...state, sectorsCorporate: action.payload.details?.knowledege_groups };
      break;
    case ActionTypes.GET_SECTORS_CORPORATE_FAILURE:
      state = { ...state, sectorsCorporate: undefined };
      break;


    case ActionTypes.ADD_SECTORS_CORPORATE:
      state = { ...state };
      break;
    case ActionTypes.ADD_SECTORS_CORPORATE_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.ADD_SECTORS_CORPORATE_FAILURE:
      state = { ...state };
      break;

    /** addDepartment */

    case ActionTypes.ADD_DEPARTMENT_CORPORATE:
      state = { ...state };
      break;
    case ActionTypes.ADD_DEPARTMENT_CORPORATE_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.ADD_DEPARTMENT_CORPORATE_FAILURE:
      state = { ...state };
      break;

    /**getDepartments */

    case ActionTypes.GET_DEPARTMENT_CORPORATE:
      state = { ...state, departmentCorporate: undefined };
      break;
    case ActionTypes.GET_DEPARTMENT_CORPORATE_SUCCESS:
      state = { ...state, departmentCorporate: action.payload };
      break;
    case ActionTypes.GET_DEPARTMENT_CORPORATE_FAILURE:
      state = { ...state, departmentCorporate: undefined };
      break;

    /**createCorporateSchedule */

    case ActionTypes.CREATE_CORPORATE_SCHEDULES:
      state = { ...state };
      break;
    case ActionTypes.CREATE_CORPORATE_SCHEDULES_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_CORPORATE_SCHEDULES_FAILURE:
      state = { ...state };
      break;

    /**getCorporateSchedulesD */

    case ActionTypes.GET_CORPORATE_SCHEDULES:
      state = { ...state, corporateSchedules: undefined };
      break;
    case ActionTypes.GET_CORPORATE_SCHEDULES_SUCCESS:
      state = { ...state, corporateSchedules: action.payload};
      break;
    case ActionTypes.GET_CORPORATE_SCHEDULES_FAILURE:
      state = { ...state, corporateSchedules: undefined };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export { DashboardReducer };
