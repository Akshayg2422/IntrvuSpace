/* eslint-disable no-self-assign */
import {
  CREATE_SECTOR,
  CREATE_SECTOR_FAILURE,
  CREATE_SECTOR_SUCCESS,
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
  jdItemNumOfPages: undefined,
  jdItemCurrentPages: 1,
  jdItemCount: undefined,
  scheduleInfo: undefined,
  selectedSection: 0,
  corporateScheduleDetails: undefined,
  loading: false,
  studentCodeOutput: undefined,
  codeOutputData: undefined,
  selectedSectionId: undefined,
  canStartInterview: undefined,
  createJdModal: false,
  departmentCorporate: undefined,
  departmentCorporateNumOfPages: undefined,
  departmentsCorporateCurrentPages: 1,
  refreshCorporateSchedules: false,
  corporateSchedules: [],
  corporateScheduleCount: undefined,
  createForOthersJdModal: false,
  interviewScheduleDetails: undefined,
  interviewUserScheduleDetails: undefined,
  retrieveEmail: undefined,
  isCreateOpening: false,
  corporateScheduleNumOfPages: undefined,
  corporateScheduleCurrentPages: 1,
  openingCandidates: [],
  openingCandidatesCount: undefined,
  openingCandidatesNumOfPages: undefined,
  openingCandidatesCurrentPages: 1,
  designations: undefined,
  designationsNumOfPage: undefined,
  designationsCurrentPage: 1,
  error: "",
  addTeamMates: undefined,
  teams: undefined,
  teamNumOfPages: undefined,
  teamCurrentPages: 1,
  sectorsCorporate: undefined,
  sectorsCorporateNumOfPages: undefined,
  sectorsCorporateCurrentPages: 1,
  onGoingScheduleMessage: undefined,
  onGoingSelectedId: undefined,
  onGoingMessage: undefined,
  interviewUrl: undefined,
  faceVisible: false,

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
      state = { ...state, breadCrumb: updatedBreadCrumb };
      break;

    /**
     * get jd item list
     */
    case ActionTypes.GET_JD_ITEM_LIST:
      state = {
        ...state,
        jdItem: [],
        jdItemNumOfPages: 0,
        jdItemCurrentPages: 1

      };
      break;
    case ActionTypes.GET_JD_ITEM_LIST_SUCCESS:
      const { jd_items } = action?.payload?.details
      state = {
        ...state,
        jdItem: jd_items?.data ? jd_items?.data : jd_items,
        jdItemNumOfPages: jd_items?.num_pages,
        jdItemCurrentPages:
          jd_items?.next_page === -1
            ? jd_items?.num_pages
            : jd_items?.next_page - 1,
      };
      break;
    case ActionTypes.GET_JD_ITEM_LIST_FAILURE:
      state = { ...state, jdItem: undefined };
      break;

    case ActionTypes.UPDATE_JD_ITEM:
      state = { ...state, jdItem: action.payload };
      break;

    /// neww 

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
      state = {
        ...state,
        corporateScheduleDetails:
          action?.payload?.details?.corporate_schedule_details,
      };
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

    /**getDepartments */

    case ActionTypes.GET_DEPARTMENT_CORPORATE:
      state = {
        ...state,
        departmentCorporate: undefined,
        departmentCorporateNumOfPages: 0,
        departmentsCorporateCurrentPages: 1,

        loading: true,
      };
      break;
    case ActionTypes.GET_DEPARTMENT_CORPORATE_SUCCESS:
      const data = action.payload?.details?.data || action.payload?.details;

      state = {
        ...state,
        departmentCorporate: data,
        departmentCorporateNumOfPages: action.payload?.details?.num_pages,
        departmentsCorporateCurrentPages:
          action.payload?.details.next_page === -1
            ? action?.payload?.details.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.GET_DEPARTMENT_CORPORATE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**getDesignation */

    case ActionTypes.GET_FETCH_DESIGNATION:
      // state = { ...state, designationsCorporate: undefined };
      state = {
        ...state,
        designations: undefined,
        designationsNumOfPage: 0,
        designationsCurrentPage: 1,
      };
      break;
    case ActionTypes.GET_FETCH_DESIGNATION_SUCCESS:
      const designations =
        action.payload?.details?.data || action.payload?.details;
      state = {
        ...state,
        designations: designations,
        designationsNumOfPage: action.payload?.details?.num_pages,
        designationsCurrentPage:
          action.payload.details.next_page === -1
            ? action?.payload?.details.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.GET_FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      break;

    //get TeamMate

    case ActionTypes.GET_TEAM_MATE_DATA:
      state = {
        ...state,
        teams: undefined,
        teamNumOfPages: 0,
        teamCurrentPages: 1,
      };
      break;
    case ActionTypes.GET_TEAM_MATE_DATA_SUCCESS:
      state = {
        ...state,
        teams: action.payload?.details?.data,
        teamNumOfPages: action.payload?.details?.num_pages,
        teamCurrentPages:
          action.payload?.details.next_page === -1
            ? action?.payload?.details.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case ActionTypes.GET_TEAM_MATE_DATA_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      break;

    /**
     * getSectorsCorporate
     */

    case ActionTypes.GET_SECTORS_CORPORATE:
      state = {
        ...state,
        sectorsCorporate: undefined,
        sectorsCorporateNumOfPages: 0,
        sectorsCorporateCurrentPages: 1,
      };
      break;

    case ActionTypes.GET_SECTORS_CORPORATE_SUCCESS:
      const sectors =
        action.payload?.details?.knowledege_groups?.data ||
        action.payload?.details?.knowledege_groups;

      state = {
        ...state,
        sectorsCorporate: sectors,
        sectorsCorporateNumOfPages:
          action.payload?.details?.knowledege_groups?.num_pages,
        sectorsCorporateCurrentPages:
          action.payload.details?.knowledege_groups?.next_page === -1
            ? action?.payload?.details?.knowledege_groups?.num_pages
            : action?.payload?.details?.knowledege_groups?.next_page - 1,
      };
      break;

    case ActionTypes.GET_SECTORS_CORPORATE_FAILURE:
      state = { ...state, sectorsCorporate: undefined };
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
      state = {
        ...state,
        corporateSchedules: [],
        corporateScheduleNumOfPages: 0,
        corporateScheduleCurrentPages: 1,
        // corporateScheduleCount: undefined,
      };
      break;
    case ActionTypes.GET_CORPORATE_SCHEDULES_SUCCESS:
      console.log(action.payload?.details);

      const { corporate_jd_items, schedule_count } = action.payload?.details;

      state = {
        ...state,
        corporateSchedules: corporate_jd_items?.data,
        corporateScheduleCount: schedule_count,
        corporateScheduleNumOfPages: corporate_jd_items.num_pages,
        corporateScheduleCurrentPages:
          corporate_jd_items.next_page === -1
            ? corporate_jd_items.num_pages
            : corporate_jd_items.next_page - 1,
      };
      break;

    case ActionTypes.GET_CORPORATE_SCHEDULES_FAILURE:
      state = {
        ...state,
        corporateSchedules: [],
        // corporateScheduleCount: undefined,
      };
      break;

    case ActionTypes.UPDATE_CORPORATE_SCHEDULE:
      state = {
        ...state,
        corporateSchedules: action.payload,
      };
      break;

    case ActionTypes.REFRESH_CORPORATE_SCHEDULE_DETAILS:
      state = {
        ...state,
        refreshCorporateSchedules: !state.refreshCorporateSchedules,
      };
      break;

    case ActionTypes.SHOW_CREATE_FOR_OTHERS_JD_MODAL:
      state = { ...state, createForOthersJdModal: true };
      break;

    case ActionTypes.HIDE_CREATE_FOR_OTHERS_JD_MODAL:
      state = { ...state, createForOthersJdModal: false };
      break;

    // createScheduleSuperAdmin

    case ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN:
      state = { ...state };
      break;
    case ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN_FAILURE:
      state = { ...state };
      break;

    // createScheduleSuperAdmin

    case ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS:
      state = { ...state };
      break;
    case ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS_SUCCESS:
      state = { ...state, interviewScheduleDetails: action.payload };
      break;
    case ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS_FAILURE:
      state = { ...state, interviewScheduleDetails: undefined };
      break;


    // resetPassword

    case ActionTypes.RESET_PASSWORD:
      state = { ...state };
      break;
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.RESET_PASSWORD_FAILURE:
      state = { ...state };
      break;

    // forgotPassword

    case ActionTypes.FORGOT_PASSWORD:
      state = { ...state, retrieveEmail: undefined };
      break;
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      state = { ...state, retrieveEmail: action.payload };
      break;
    case ActionTypes.FORGOT_PASSWORD_FAILURE:
      state = { ...state, retrieveEmail: action.payload };
      break;

    // showCreateOpeningsModal

    case ActionTypes.SHOW_CREATE_OPENINGS_MODAL:
      state = { ...state, isCreateOpening: true };
      break;

    case ActionTypes.HIDE_CREATE_OPENINGS_MODAL:
      state = { ...state, isCreateOpening: false };
      break;

    // postManualApprovalOnCandidate

    case ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE:
      state = { ...state };
      break;
    case ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE_FAILURE:
      state = { ...state };
      break;

    // getCandidatesCorporate

    case ActionTypes.FETCH_CANDIDATES_CORPORATE:
      state = {
        ...state,
        openingCandidates: undefined,
        openingCandidatesNumOfPages: 0,
        openingCandidatesCurrentPages: 1,
        openingCandidatesCount: undefined,
      };
      break;

    case ActionTypes.FETCH_CANDIDATES_CORPORATE_SUCCESS:
      const { corporate_candidate_details, candidate_count } =
        action.payload?.details;

      state = {
        ...state,
        openingCandidatesCount: candidate_count,
        openingCandidates: corporate_candidate_details?.data,
        openingCandidatesNumOfPages: corporate_candidate_details.num_pages,
        openingCandidatesCurrentPages:
          corporate_candidate_details.next_page === -1
            ? corporate_candidate_details.num_pages
            : corporate_candidate_details.next_page - 1,
      };
      break;

    case ActionTypes.FETCH_CANDIDATES_CORPORATE_FAILURE:
      state = {
        ...state,
        openingCandidates: undefined,
        openingCandidatesCount: undefined,
      };
      break;



    //ongoing selected id
    case ActionTypes.ON_GOING_SELECTED_ID:
      state = {
        ...state,
        onGoingSelectedId: action.payload,
      };
      break;

    // corporateScheduleActions

    case ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS:
      state = { ...state };
      break;
    case ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS_SUCCESS:
      state = { ...state };
      break;
    case ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS_FAILURE:
      state = { ...state };
      break;

    // watch interview video

    case ActionTypes.WATCH_INTERVIEW_VIDEO_URL:
      state = {
        ...state,
        interviewUrl: action.payload,
      };
      break;

    // setfacevisible

    case ActionTypes.SET_FACE_VISIBLE:
      state = {
        ...state,
        faceVisible: action.payload,
      };
      break;



    default:
      state = state;
      break;
  }

  return state;
};

export { DashboardReducer };
