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

// addDesignation

export const addDesignationApi = payload => post(URL.URL_ADD_DESIGNATION, payload, {});

// getDepartments

export const getDesignationApi = payload => post(URL.URL_GET_FETCH_DESIGNATION, payload, {});

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


/**
 * get otp for email verification
 */

export const getOtpForEmailVerificationAPi = payload => post(URL.URL_GET_OTP_FOR_EMAIL_VERIFICATION, payload, {});


/**
 *  verify email using otp
 */

export const verifyEmailUsingOtpApi = payload => post(URL.URL_VERIFY_EMAIL_USING_OTP, payload, {})


/**
 *  register as corporate
 */

export const registerAsCompanyApi = payload => post(URL.URL_REGISTER_AS_COMPANY, payload, {});


//corporateScheduleActions

export const postCorporateScheduleActionsApi = payload => post(URL.POST_CORPORATE_SCHEUDULE_ACTIONS, payload, {});

// addTeamMate

export const addTeamMateDataApi = payload => post(URL.URL_ADD_TEAM_MATE_DATA, payload, {});

// getTeamMate

export const getTeamMateDataApi = payload => post(URL.URL_GET_TEAM_MATE_DATA, payload, {});


export const getOngoingSchedulesApi = payload => post(URL.GRT_ONGOING_SCHEDULES, payload, {})




/**
 * get Dashboard Api
 */

export const getDashboardApi = payload => post(URL.URL_DASHBOARD, payload, {})

/* get company api */
export const getCompanies = payload => post(URL.URL_GETCOMPANY, payload, {});

/**
 * get companies
 */

export const getCompaniesApi = payload => post(URL.URL_GET_COMPANIES, payload, {})

/**
 * alter company status
 */

export const alterCompanyStatusApi = payload => post(URL.URL_ALTER_COMPANY_STATUS, payload, {})


/**
 * alter company Limits
 */

export const alterCompanyLimitApi = payload => post(URL.URL_ALTER_COMPANY_LIMIT, payload, {})

/*
 get recent interviews
 */

export const getRecentInterviewsApi = payload => post(URL.URL_GET_RECENT_INTERVIEWS, payload, {})

/*
getCandidate
*/

export const getCandidatesApi = payload => post(URL.URL_GET_CANDIDATES, payload, {})

export const addCandidatesApi = payload => post(URL.URL_ADD_CANDIDATE, payload, {})


/**
 * add super admin create company
 */

export const createCompanySuperAdminApi = payload => post(URL.URL_CREATE_COMPANY_SUPER_ADMIN, payload, {})


/*
 getJdSection
 */
export const getJdSectionApi = payload => post(URL.URL_GET_JD_SECTION, payload, {})



/**
 * get corporate schedule lite GetCorporateSchedulesLite
 */
export const getCorporateScheduleLiteApi = payload => post(URL.URL_GET_CORPORATE_SCHEDULES_LITE, payload, {})



/**
 * create opening lite
 */
export const createOpeningLiteApi = payload => post(URL.URL_CREATE_OPENING_LITE, payload, {})


/**
 * add candidate corporate  lite
 */
export const addCandidateCorporateLiteApi = payload => post(URL.URL_ADD_CANDIDATE_CORPORATE_LITE, payload, {})




/**
 * switch to advance
 */
export const switchToAdvanceApi = payload => post(URL.URL_SWITCH_TO_ADVANCE, payload, {})


/**logout api */
export const logoutApi = payload => post(URL.URL_LOGOUT, payload, {})

/* super admin report reGenerate */

export const reGenerateReportApi = payload => post(URL.URL_GENERATED_REPORT, payload, {})
/** recordAuthenticationVideo */

export const recordAuthenticationVideoApi = payload => post(URL.URL_RECORD_AUTHENTICATION_VIDEO, payload, {})
