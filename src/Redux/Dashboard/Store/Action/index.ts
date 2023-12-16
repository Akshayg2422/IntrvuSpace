import * as ActionTypes from "../ActionTypes";
export const getStartChat = (params: any) => {
  return {
    type: ActionTypes.GET_START_CHAT,
    payload: params,
  };
};

export const getStartChatSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_START_CHAT_SUCCESS,
    payload: response,
  };
};

export const getStartChatFailure = (error: any) => {
  return {
    type: ActionTypes.GET_START_CHAT_FAILURE,
    payload: error,
  };
};

// createKnowledgeGroup

export const createKnowledgeGroup = (params: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP,
    payload: params,
  };
};

export const createKnowledgeGroupSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_SUCCESS,
    payload: response,
  };
};

export const createKnowledgeGroupFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_FAILURE,
    payload: error,
  };
};

// createKnowledgeGroupVariant

export const createKnowledgeGroupVariant = (params: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT,
    payload: params,
  };
};

export const createKnowledgeGroupVariantSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS,
    payload: response,
  };
};

export const createKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error,
  };
};

// getKnowledgeGroupVariant

export const getKnowledgeGroupVariant = (params: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT,
    payload: params,
  };
};

export const getKnowledgeGroupVariantSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS,
    payload: response,
  };
};

export const getKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error,
  };
};

// getKnowledgeGroups

export const getKnowledgeGroups = (params: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP,
    payload: params,
  };
};

export const getKnowledgeGroupsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_SUCCESS,
    payload: response,
  };
};

export const getKnowledgeGroupsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_FAILURE,
    payload: error,
  };
};

// getSectors

export const getSectors = (params: any) => {
  return {
    type: ActionTypes.GET_SECTORS,
    payload: params,
  };
};

export const getSectorsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_SECTORS_SUCCESS,
    payload: response,
  };
};

export const getSectorsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_SECTORS_FAILURE,
    payload: error,
  };
};

// setSelectedRole

export const setSelectedRole = (params) => {

  return {
    type: ActionTypes.SET_SELECTED_ROLE,
    payload: params,
  };
};

// createSector

export const createSector = (params: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR,
    payload: params,
  };
};
export const createSectorSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR_SUCCESS,
    payload: response,
  };
};

export const createSectorFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR_FAILURE,
    payload: error,
  };
};

// CREATE QUESTION FORM

export const createQuestionForm = (params: any) => {
  return {
    type: ActionTypes.CREATE_QUESTION_FORM,
    payload: params,
  };
};

export const createQuestionFormSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_QUESTION_FORM_SUCCESS,
    payload: response,
  };
};

export const createQuestionFormFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_QUESTION_FORM_FAILURE,
    payload: error,
  };
};

/**
 *  selected client sector
 */

export const setClientSector = (params: any) => {
  return {
    type: ActionTypes.SET_CLIENT_SECTORS,
    payload: params,
  };
};

/**
 * createQuestionSection
 */

export const createQuestionSection = (params: any) => {
  return {
    type: ActionTypes.CREATE_QUESTION_SECTION,
    payload: params,
  };
};

// GET QUESTIONS FORM

export const getQuestionForm = (params: any) => {
  return {
    type: ActionTypes.GET_QUESTIONS_FORM,
    payload: params,
  };
};

export const getQuestionFormSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_QUESTIONS_FORM_SUCCESS,
    payload: response,
  };
};

export const getQuestionFormFailure = (error: any) => {
  return {
    type: ActionTypes.GET_QUESTIONS_FORM_FAILURE,
    payload: error,
  };
};

/**
 *
 */

export const generateForm = (params: any) => {
  return {
    type: ActionTypes.GENERATE_FORM,
    payload: params,
  };
};

// GET QUESTION SECTIONS

export const getQuestionSection = (params: any) => {
  return {
    type: ActionTypes.GET_QUESTION_SECTION,
    payload: params,
  };
};

export const getQuestionSectionSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_QUESTION_SECTION_SUCCESS,
    payload: response,
  };
};

export const getQuestionSectionFailure = (error: any) => {
  return {
    type: ActionTypes.GET_QUESTION_SECTION_FAILURE,
    payload: error,
  };
};

// SET_SELECTED_QUESTION_FORM

export const setSelectedQuestionForm = (params) => {
  return {
    type: ActionTypes.SET_SELECTED_QUESTION_FORM,
    payload: params,
  };
};

// GET_FORM_SECTION_QUESTIONS

export const getFormSectionQuestions = (params: any) => {
  return {
    type: ActionTypes.GET_FORM_SECTION_QUESTIONS,
    payload: params,
  };
};

export const getFormSectionQuestionsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_FORM_SECTION_QUESTIONS_SUCCESS,
    payload: response,
  };
};

export const getFormSectionQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_FORM_SECTION_QUESTIONS_FAILURE,
    payload: error,
  };
};

// get basic report

export const fetchBasicReport = (params: any) => {
  return {
    type: ActionTypes.FETCH_BASIC_REPORT,
    payload: params,
  };
};
export const fetchBasicReportSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_BASIC_REPORT_SUCCESS,
    payload: response,
  };
};
export const fetchBasicReportFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_BASIC_REPORT_FAILURE,
    payload: error,
  };
};

// getMyPastInterviews

export const getMyPastInterviews = (params: any) => {
  return {
    type: ActionTypes.GET_MY_PAST_INTERVIEWS,
    payload: params,
  };
};
export const getMyPastInterviewsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_MY_PAST_INTERVIEWS_SUCCESS,
    payload: response,
  };
};
export const getMyPastInterviewsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_MY_PAST_INTERVIEWS_FAILURE,
    payload: error,
  };
};

// SELECTED_SCHEDULE_ID

export const selectedScheduleId = (id: any) => {
  return {
    type: ActionTypes.SELECTED_SCHEDULE_ID,
    payload: id,
  };
};

// GENERATE_SECTION_QUESTIONS

export const fetchGenerateSectionQuestions = (params: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS,
    payload: params,
  };
};
export const fetchGenerateSectionQuestionsSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS_SUCCESS,
    payload: response,
  };
};
export const fetchGenerateSectionQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS_FAILURE,
    payload: error,
  };
};

// GENERATE_FORM_SECTIONS_AND_QUESTIONS

export const fetchGenerateFormSectionsAndQuestions = (params: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS,
    payload: params,
  };
};
export const fetchGenerateFormSectionsAndQuestionsSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS_SUCCESS,
    payload: response,
  };
};
export const fetchGenerateFormSectionsAndQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS_FAILURE,
    payload: error,
  };
};

// FETCH_UPDATE_QUESTION_DETAILS

export const fetchUpdateQuestionDetails = (params: any) => {
  return {
    type: ActionTypes.FETCH_UPDATE_QUESTION_DETAILS,
    payload: params,
  };
};
export const fetchUpdateQuestionDetailsSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_UPDATE_QUESTION_DETAILS_SUCCESS,
    payload: response,
  };
};
export const fetchUpdateQuestionDetailsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_UPDATE_QUESTION_DETAILS_FAILURE,
    payload: error,
  };
};
// GET REGISTER DATA

export const settingRegisterData = (response: any) => {
  return {
    type: ActionTypes.GET_REGISTER_DATA,
    payload: response,
  };
};

// GENERATE_SECTIONS

export const generateSections = (params: any) => {
  return {
    type: ActionTypes.GENERATE_SECTIONS,
    payload: params,
  };
};
export const generateSectionsSuccess = (response: any) => {
  return {
    type: ActionTypes.GENERATE_SECTIONS_SUCCESS,
    payload: response,
  };
};
export const generateSectionsFailure = (error: any) => {
  return {
    type: ActionTypes.GENERATE_SECTIONS_FAILURE,
    payload: error,
  };
};

// CREATE_SCHEDULE

export const createSchedule = (params: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULE,
    payload: params,
  };
};
export const createScheduleSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULE_SUCCESS,
    payload: response,
  };
};
export const createScheduleFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULE_FAILURE,
    payload: error,
  };
};

// setting remove side nav

export const settingSideNavRemove = (params: any) => {
  return {
    type: ActionTypes.REMOVE_SIDE_NAV,
    payload: params,
  };
};

// BreadCrumbs

export const breadCrumbs = (params: any) => {
  return {
    type: ActionTypes.BREADCRUMBS,
    payload: params,
  };
};

export const clearBreadCrumbs = (params: any) => {
  return {
    type: ActionTypes.CLEAR_BREADCRUMBS,
    payload: params,
  };
};
// SCREEN_RECORDING_PERMISSION

export const screenRecordingPermission = (params: any) => {
  return {
    type: ActionTypes.SCREEN_RECORDING_PERMISSION,
    payload: params,
  };
};

// recordInterviewSession

export const recordInterviewSession = (params: any) => {
  return {
    type: ActionTypes.INTERVIEW_RECORDER_SESSION,
    payload: params,
  };
};
export const recordInterviewSessionSuccess = (response: any) => {
  return {
    type: ActionTypes.INTERVIEW_RECORDER_SESSION_SUCCESS,
    payload: response,
  };
};
export const recordInterviewSessionFailure = (error: any) => {
  return {
    type: ActionTypes.INTERVIEW_RECORDER_SESSION_FAILURE,
    payload: error,
  };
};

// RECORDING_VIDEO_SESSION_DETAILS

export const getRecordedVideoSessionDetails = (params: any) => {
  return {
    type: ActionTypes.RECORDING_VIDEO_SESSION_DETAILS,
    payload: params,
  };
};

// create jd variant

export const postJdVariant = (params: any) => {
  return {
    type: ActionTypes.POST_JD_VARIANT,
    payload: params,
  };
};
export const postJdVariantSuccess = (response: any) => {
  return {
    type: ActionTypes.POST_JD_VARIANT_SUCCESS,
    payload: response,
  };
};

export const postJdVariantFailure = (error: any) => {
  return {
    type: ActionTypes.POST_JD_VARIANT_FAILURE,
    payload: error,
  };
};

// CLEAR_LAST_BREADCRUMB

export const clearLastBreadcrumb = () => ({
  type: ActionTypes.CLEAR_LAST_BREADCRUMB,
});

// create jd item list

export const getJdItemList = (params: any) => {
  return {
    type: ActionTypes.GET_JD_ITEM_LIST,
    payload: params,
  };
};
export const getJdItemListSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_JD_ITEM_LIST_SUCCESS,
    payload: response,
  };
};

export const getJdItemListFailure = (error: any) => {
  return {
    type: ActionTypes.GET_JD_ITEM_LIST_FAILURE,
    payload: error,
  };
};

/**
 * update Jd item
 */

export const updateJdItem = (params: any) => {
  return {
    type: ActionTypes.UPDATE_JD_ITEM,
    payload: params,
  };
};

// GET_SCHEDULE_BASIC_INFO

export const getScheduleBasicInfo = (params: any) => {
  return {
    type: ActionTypes.GET_SCHEDULE_BASIC_INFO,
    payload: params,
  };
};
export const getScheduleBasicInfoSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_SCHEDULE_BASIC_INFO_SUCCESS,
    payload: response,
  };
};

export const getScheduleBasicInfoFailure = (error: any) => {
  return {
    type: ActionTypes.GET_SCHEDULE_BASIC_INFO_FAILURE,
    payload: error,
  };
};

// create new jd schedule

export const createNewJdSchedule = (params: any) => {
  return {
    type: ActionTypes.CREATE_NEW_JD_SCHEDULE,
    payload: params,
  };
};

// selected

export const setSelectedSection = (params: any) => {
  return {
    type: ActionTypes.SET_SELECTED_SECTION,
    payload: params,
  };
};

// create corporate variant

export const createCorporateVariant = (params: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_VARIANT,
    payload: params,
  };
};
export const createCorporateVariantSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_VARIANT_SUCCESS,
    payload: response,
  };
};

export const createCorporateVariantFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_VARIANT_FAILURE,
    payload: error,
  };
};

// GET_CORPORATE_SCHEDULE_DETAILS

export const getCorporateScheduleDetails = (params: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS,
    payload: params,
  };
};
export const getCorporateScheduleDetailsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getCorporateScheduleDetailsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULE_DETAILS_FAILURE,
    payload: error,
  };
};


export const refreshCorporateSchedule = () => {
  return {
    type: ActionTypes.REFRESH_CORPORATE_SCHEDULE_DETAILS,
  };
};

/**
 * student code submission
 */

export const postStudentCodeSubmission = (params: any) => {
  return {
    type: ActionTypes.STUDENT_CODE_SUBMISSION,
    payload: params,
  };
};

export const postStudentCodeSubmissionSuccess = (response: any) => {
  return {
    type: ActionTypes.STUDENT_CODE_SUBMISSION_SUCCESS,
    payload: response,
  };
};

export const postStudentCodeSubmissionFailure = (response: any) => {
  return {
    type: ActionTypes.STUDENT_CODE_SUBMISSION_FAILURE,
    payload: response,
  };
};

// settingCodeOutputData
export const settingCodeOutputData = (response: any) => {
  return {
    type: ActionTypes.SETTING_CODE_OUTPUT_DATA,
    payload: response,
  };
};
{
  /* close interview
   */
}

export const closeInterview = (params: any) => {
  return {
    type: ActionTypes.CLOSE_INTERVIEW,
    payload: params,
  };
};
export const closeInterviewSuccess = (response: any) => {
  return {
    type: ActionTypes.CLOSE_INTERVIEW_SUCCESS,
    payload: response,
  };
};

export const closeInterviewFailure = (error: any) => {
  return {
    type: ActionTypes.CLOSE_INTERVIEW_FAILURE,
    payload: error,
  };
};

// setting Selected Section Id

export const settingSelectedSectionId = (response: any) => {
  return {
    type: ActionTypes.SETTING_SELECTED_SECTION_ID,
    payload: response,
  };
};

/**
 *
 * @param params can start interview api handler
 * @returns
 */

export const canStartInterview = (params: any) => {
  return {
    type: ActionTypes.CAN_START_INTERVIEW,
    payload: params,
  };
};
export const canStartInterviewSuccess = (response: any) => {
  return {
    type: ActionTypes.CAN_START_INTERVIEW_SUCCESS,
    payload: response,
  };
};

export const canStartInterviewFailure = (error: any) => {
  return {
    type: ActionTypes.CAN_START_INTERVIEW_FAILURE,
    payload: error,
  };
};

// OPEN_JD_MODAL

export const showCreateJddModal = () => {
  return {
    type: ActionTypes.SHOW_CREATE_JD_MODAL,
  };
};

export const hideCreateJdModal = () => {
  return {
    type: ActionTypes.HIDE_CREATE_JD_MODAL,
  };
};

//getsectorcorporate

export const getSectorCorporate = (params: any) => {
  return {
    type: ActionTypes.GET_SECTORS_CORPORATE,
    payload: params,
  };
};
export const getSectorCorporateSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_SECTORS_CORPORATE_SUCCESS,
    payload: response,
  };
};
export const getSectorCorporateFailure = (error: any) => {
  return {
    type: ActionTypes.GET_SECTORS_CORPORATE_FAILURE,
    payload: error,
  };
};

export const addSectorCorporate = (params: any) => {
  return {
    type: ActionTypes.ADD_SECTORS_CORPORATE,
    payload: params,
  };
};

/** 
 * Add department
 */


export const addDepartmentCorporate = (params: any) => {
  return {
    type: ActionTypes.ADD_DEPARTMENT_CORPORATE,
    payload: params,
  };
};

// getDepartments

export const getDepartmentCorporate = (params: any) => {
  return {
    type: ActionTypes.GET_DEPARTMENT_CORPORATE,
    payload: params,
  };
};
export const getDepartmentCorporateSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_DEPARTMENT_CORPORATE_SUCCESS,
    payload: response,
  };
};
export const getDepartmentCorporateFailure = (error: any) => {
  return {
    type: ActionTypes.GET_DEPARTMENT_CORPORATE_FAILURE,
    payload: error,
  };
};

// addDesignation

export const addDesignation = (params: any) => {
  return {
    type: ActionTypes.ADD_DESIGNATION,
    payload: params,
  };
};


// getDesignation

export const getDesignations = (params: any) => {
  return {
    type: ActionTypes.GET_FETCH_DESIGNATION,
    payload: params,
  };
};
export const getDesignationsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};
export const getDesignationsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

// Add TeamMate Data

export const addTeamMateData = (params: any) => {
  return {
    type: ActionTypes.ADD_TEAM_MATE_DATA,
    payload: params,
  }
}


// grt TeamMate Data

export const getTeamMateData = (params: any) => {
  return {
    type: ActionTypes.GET_TEAM_MATE_DATA,
    payload: params,
  }
}

export const getTeamMateDataSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_TEAM_MATE_DATA_SUCCESS,
    payload: response,
  }
}

export const getTeamMateDataFailure = (error: any) => {
  return {
    type: ActionTypes.GET_TEAM_MATE_DATA_FAILURE,
    payload: error
  }
}

// createCorporateSchedule

export const createCorporateSchedules = (params: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_SCHEDULES,
    payload: params,
  };
};
export const createCorporateSchedulesSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_SCHEDULES_SUCCESS,
    payload: response,
  };
};
export const createCorporateSchedulesFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_CORPORATE_SCHEDULES_FAILURE,
    payload: error,
  };
};

// getCorporateSchedules

export const getCorporateSchedules = (params: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULES,
    payload: params,
  };
};
export const getCorporateSchedulesSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULES_SUCCESS,
    payload: response,
  };
};
export const getCorporateSchedulesFailure = (error: any) => {
  return {
    type: ActionTypes.GET_CORPORATE_SCHEDULES_FAILURE,
    payload: error,
  };
};

export const showCreateForOthersJdModal = () => {
  return {
    type: ActionTypes.SHOW_CREATE_FOR_OTHERS_JD_MODAL,
  };
};

// showModalCreateForOthers

export const hideCreateForOthersJdModal = () => {
  return {
    type: ActionTypes.HIDE_CREATE_FOR_OTHERS_JD_MODAL,
  };
};

// createScheduleSuperAdmin

export const createSchedulesSuperAdmin = (params: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN,
    payload: params,
  };
};
export const createSchedulesSuperAdminSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN_SUCCESS,
    payload: response,
  };
};
export const createSchedulesSuperAdminFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_SCHEDULES_SUPER_ADMIN_FAILURE,
    payload: error,
  };
};

/**
 * getInterviewScheduleDetails
 */
export const getInterviewScheduleDetails = (params: any) => {
  return {
    type: ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS,
    payload: params,
  };
};
export const getInterviewScheduleDetailsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS_SUCCESS,
    payload: response,
  };
};
export const getInterviewScheduleDetailsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_INTERVIEW_SCHEDULE_DETAILS_FAILURE,
    payload: error,
  };
};

// RESET_PASSWORD

export const resetPassword = (params: any) => {
  return {
    type: ActionTypes.RESET_PASSWORD,
    payload: params,
  };
};
export const resetPasswordSuccess = (response: any) => {
  return {
    type: ActionTypes.RESET_PASSWORD_SUCCESS,
    payload: response,
  };
};
export const resetPasswordFailure = (error: any) => {
  return {
    type: ActionTypes.RESET_PASSWORD_FAILURE,
    payload: error,
  };
};

// FORGOT_PASSWORD

export const forgotPassword = (params: any) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD,
    payload: params,
  };
};
export const forgotPasswordSuccess = (response: any) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
    payload: response,
  };
};
export const forgotPasswordFailure = (error: any) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_FAILURE,
    payload: error,
  };
};

/**
 *  reset interview
 */

export const resetInterview = (params: any) => {
  return {
    type: ActionTypes.RESET_INTERVIEW,
    payload: params,
  };
};

/**
 *  reset interview
 */

export const deleteInterview = (params: any) => {
  return {
    type: ActionTypes.DELETE_INTERVIEW,
    payload: params,
  };
};

/**
 *  delete JD
 */

export const deleteJd = (params: any) => {
  return {
    type: ActionTypes.DELETE_JD,
    payload: params,
  };
};

// bulkUploadCandidatesCP

export const bulkUploadCandidates = (params: any) => {
  return {
    type: ActionTypes.BULK_UPLOAD_CANDIDATES_CP,
    payload: params,
  };
};


// showCreateOpeningsModal

export const showCreateOpeningsModal = () => {
  return {
    type: ActionTypes.SHOW_CREATE_OPENINGS_MODAL,
  };
};

export const hideCreateOpeningsModal = () => {
  return {
    type: ActionTypes.HIDE_CREATE_OPENINGS_MODAL,
  };
};

// POST_MANUAL_APPROVALS_ON_CANDIDATE

export const postManualApprovalOnCandidate = (params: any) => {
  return {
    type: ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE,
    payload: params,
  };
};
export const postManualApprovalOnCandidateSuccess = (response: any) => {
  return {
    type: ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE_SUCCESS,
    payload: response,
  };
};
export const postManualApprovalOnCandidateFailure = (error: any) => {
  return {
    type: ActionTypes.POST_MANUAL_APPROVALS_ON_CANDIDATE_FAILURE,
    payload: error,
  };
};

// getCandidatesCorporate

export const fetchCandidatesCorporate = (params: any) => {
  return {
    type: ActionTypes.FETCH_CANDIDATES_CORPORATE,
    payload: params,
  };
};
export const fetchCandidatesCorporateSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_CANDIDATES_CORPORATE_SUCCESS,
    payload: response,
  };
};
export const fetchCandidatesCorporateFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_CANDIDATES_CORPORATE_FAILURE,
    payload: error,
  };
};



/**
 *  reset interview
 */

export const syncVideo = (params: any) => {
  return {
    type: ActionTypes.SYNC_VIDEO,
    payload: params,
  };
};

// corporateScheduleActions

export const postCorporateScheduleActions = (params: any) => {
  return {
    type: ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS,
    payload: params,
  };
};
export const postCorporateScheduleActionsSuccess = (response: any) => {
  return {
    type: ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS_SUCCESS,
    payload: response,
  };
};
export const postCorporateScheduleActionsFailure = (error: any) => {
  return {
    type: ActionTypes.POST_CORPORATE_SCHEUDULE_ACTIONS_FAILURE,
    payload: error,
  };
};







export const onGoingSelectedIIds = (params: any) => {
  console.log('parasmaaasssss,', params)
  return {
    type: ActionTypes.ON_GOING_SELECTED_ID,
    payload: params,
  };
};



/**
 *  update corporate Schedules
 */


export const updateCorporateSchedules = (response: any) => {
  return {
    type: ActionTypes.UPDATE_CORPORATE_SCHEDULE,
    payload: response,
  };
};


/**
 *  watch inteview video
 */


export const watchInterviewVideoUrl = (response: any) => {

  return {
    type: ActionTypes.WATCH_INTERVIEW_VIDEO_URL,
    payload: response,
  };
};

// facevisible

export const setFaceVisible = (response: any) => {
  console.log('face params', response);

  return {
    type: ActionTypes.SET_FACE_VISIBLE,
    payload: response,
  };
};


