import { post } from '../ApiHelper';
import * as URL from '../UrlHelper'

export const getStartChatApi = payload => post(URL.GET_START_CHAT, payload, {});

// createKnowledgeGroup

export const createKnowledgeGroupApi = payload => post(URL.CREATE_KNOWLEDGE_GROUP_URL, payload, {});


// createKnowledgeGroupVariant

export const createKnowledgeGroupVariantApi = payload => post(URL.CREATE_KNOWLEDGE_GROUP_VARIANT_URL, payload, {});

// getKnowledgeGroups

export const getKnowledgeGroupApi = payload => post(URL.GET_KNOWLEDGE_GROUP_URL, payload, {});

// getKnowledgeGroupVariant

export const getKnowledgeGroupVariantApi = payload => post(URL.GET_KNOWLEDGE_GROUP_VARIANT_URL, payload, {});
export const getSectorsApi = payload => post(URL.URL_GET_SECTORS, payload, {});

// createQuestionForm
export const createQuestionForm = payload => post(URL.URL_CREATE_QUESTION_FORM, payload, {});

// getQuestionsForm
export const getQuestionFormApi = payload => post(URL.URL_GET_QUESTION_FORMS, payload, {});

export const createQuestionSectionApi = payload => post(URL.URL_CREATE_QUESTION_SECTION, payload, {});

// createSector

export const createSectorApi = payload => post(URL.URL_CREATE_SECTOR, payload, {});
export const generateFormApi = payload => post(URL.URL_GENERATE_FORM, payload, {});

// GET_QUESTION_SECTIONS 
export const getQuestionSectionApi = payload => post(URL.URL_GET_QUESTION_SECTIONS, payload, {});

// URL_GET_FORM_SECTION_QUESTIONS
export const getFormSectionsQuestionsApi = payload => post(URL.URL_GET_FORM_SECTION_QUESTIONS, payload, {});


export const getBasicReportApi = payload => post(URL.URL_GET_BASIC_REPORT, payload, {});

export const getMyPastInterviewsApi = payload => post(URL.URL_GET_MY_PAST_INTERVIEWS, payload, {});

//register as member

export const registerAsMemberAPi = payload => post(URL.URL_REGISTER_AS_MEMBER, payload, {});

//URL_MEMBER_LOGIN_USING_PASSWORD

export const memberLoginUsingPasswordApi = payload => post(URL.URL_MEMBER_LOGIN_USING_PASSWORD, payload, {});

// GENERATE_SECTION_QUESTIONS

export const generateSectionQuestionsApi = payload => post(URL.URL_GENERATE_SECTION_QUESTIONS, payload, {});

// URL_GENERATE_FORM_SECTIONS_AND_QUESTIONS

export const generateFormSectionsAndQuestionsApi = payload => post(URL.URL_GENERATE_FORM_SECTIONS_AND_QUESTIONS, payload, {});

// UPDATE_QUESTION_DETAILS

export const updateQuestionDetailsApi = payload => post(URL.URL_UPDATE_QUESTION_DETAILS, payload, {});




//get otp

export const fetchOTPApi = payload => post(URL.URL_GET_OTP, payload, {});

//member login using otp

export const fetchMemberLoginUsingOtpApi = payload => post(URL.URL_MEMBER_LOGIN_USING_OTP, payload, {});

// createSchedule

export const PostCreateScheduleApi = payload => post(URL.URL_CREATE_SCHEDULE, payload, {});

// recordInterviewSession 

export const PostRecorderInterviewSessionApi = payload => post(URL.URL_RECORDER_INTERVIEW_SESSION, payload, {});

// create jd variant

export const postJdVariantApi = payload => post(URL.URL_CREATE_JD_VARIANT, payload, {});

/**
 * get jd item list
 * @param {*} payload 
 * @returns 
 */

export const getJdItemList = payload => post(URL.URL_GET_JD_ITEM_LIST, payload, {});


// URL_GET_SCHEDULE_BASIC_INFO

export const getScheduleBasicInfo = payload => post(URL.URL_GET_SCHEDULE_BASIC_INFO, payload, {});

/**
 * 
 * create new jd schedule
 * @param {*} payload 
 * @returns 
 */
export const createNewJdSchedule = payload => post(URL.URL_CREATE_NEW_JD_SCHEDULE, payload, {});

//

// createQuestionForm
export const createCorporateVariantForm = payload => post(URL.URL_CREATE_CORPORATE_VARIANT, payload, {});

// URL_GET_KNOWLEDGE_GROUP_VARIANT_DETAILS

export const getCorporateScheduleDetailsApi = payload => post(URL.URL_GET_CORPORATE_SCHEDULE_DETAILS, payload, {});

export const postStudentCodeSubmissionApi = (payload) => post(URL.STUDENT_CODE_SUBMISSION_URL, payload, {}, 'https://codesubmitprimary.leorainfotech.in/')
export const closeInterviewApi = payload => post(URL.URL_CLOSE_INTERVIEW, payload, {});


export const canStartInterviewApi = payload => post(URL.URL_CAN_START_INTERVIEW, payload, {});

// createCorporateSector 

export const createCorporateSectorApi = payload => post(URL.URL_GET_SECTOR_CORPORATE, payload, {});

export const addCorporateSectorApi = payload => post(URL.URL_ADD_SECTOR_CORPORATE, payload, {});

// addDepartment

export const addDepartmentCorporateApi = payload => post(URL.URL_ADD_DEPARTMENT, payload, {});

// getDepartments

export const getDepartmentCorporateApi = payload => post(URL.URL_GET_DEPARTMENT, payload, {});

// createCorporateSchedule

export const createCorporateScheduleApi = payload => post(URL.URL_CREATE_CORPORATE_SCHEDULE, payload, {});

// getCorporateSchedules

export const getCorporateSchedulesApi = payload => post(URL.URL_GET_CORPORATE_SCHEDULE, payload, {});

// createSchedulesSuperAdmin

export const createSchedulesSuperAdminApi = payload => post(URL.URL_CREATE_SCHEDULES_SUPER_ADMIN, payload, {});
export const getInterviewScheduleDetailsApi = payload => post(URL.URL_GET_INTERVIEW_SCHEDULE_DETAILS, payload, {});


// createSchedulesSuperAdmin

export const resetInterviewApi = payload => post(URL.URL_RESET_INTERVIEW, payload, {});
export const deleteInterviewApi = payload => post(URL.URL_DELETE_INTERVIEW, payload, {});




/**
 * delete jd 
 */
export const deleteJdApi = payload => post(URL.URL_DELETE_JD, payload, {});


// resetPassword

export const resetPasswordApi = payload => post(URL.URL_RESET_PASSWORD, payload, {});

// forgotPassword

export const forgotPasswordApi = payload => post(URL.URL_FORGOT_PASSWORD, payload, {});

// bulkUploadCandidatesCP

export const bulkUploadCandidatesCpApi = payload => post(URL.URL_BULK_UPLOAD_CANDIDATE_CP, payload, {});

// POST_MANUAL_APPROVALS_ON_CANDIDATE

export const postManualApprovalOnCandidateApi = payload => post(URL.POST_MANUAL_APPROVALS_ON_CANDIDATE, payload, {});

// getCandidatesCorporate
export const fetchCandidatesCorporateApi = payload => post(URL.FETCH_CANDIDATES_CORPORATE, payload, {});

/**
 * video sync api
 */


export const syncVideoApi = payload => post(URL.URL_SYNC_VIDEO, payload, {});

//corporateScheduleActions

export const postCorporateScheduleActionsApi = payload => post(URL.POST_CORPORATE_SCHEUDULE_ACTIONS, payload, {});




