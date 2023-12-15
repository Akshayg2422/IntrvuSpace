/**
 * sample api
 */
const ASSISTANT = '/ivoassistant/'
const EMPLOYEE = '/employee/'
const COMPANY = '/company/'
const AUTH = '/authentication/'



export const GET_START_CHAT = ASSISTANT + 'processCall';

// createKnowledgeGroupVariant

export const CREATE_KNOWLEDGE_GROUP_VARIANT_URL = ASSISTANT + 'createKnowledgeGroupVariant';


// createKnowledgeGroup

export const CREATE_KNOWLEDGE_GROUP_URL = ASSISTANT + 'createKnowledgeGroup';

// getKnowledgeGroups

export const GET_KNOWLEDGE_GROUP_URL = ASSISTANT + 'getKnowledgeGroups';

// getKnowledgeGroupVariants

export const GET_KNOWLEDGE_GROUP_VARIANT_URL = ASSISTANT + 'getKnowledgeGroupVariants';

// createSector

export const URL_CREATE_SECTOR = ASSISTANT + 'createSector';

// getSector
export const URL_GET_SECTORS = ASSISTANT + 'getSectors';

// createQuestionFrom
export const URL_CREATE_QUESTION_FORM = ASSISTANT + 'createQuestionForm'

// getQuestionForm
export const URL_GET_QUESTION_FORMS = ASSISTANT + 'getQuestionForms'
export const URL_CREATE_QUESTION_SECTION = ASSISTANT + 'createQuestionSections'


// generate form
export const URL_GENERATE_FORM = ASSISTANT + 'generateForm'

// getQuestionSections

export const URL_GET_QUESTION_SECTIONS = ASSISTANT + 'getQuestionSections'

// getFormSectionQuestions

export const URL_GET_FORM_SECTION_QUESTIONS = ASSISTANT + 'getFormSectionQuestions'


export const URL_GET_BASIC_REPORT = ASSISTANT + 'getBasicReport'

// getMyPastInterviews

export const URL_GET_MY_PAST_INTERVIEWS = ASSISTANT + 'getMyPastInterviews'

// register as member

export const URL_REGISTER_AS_MEMBER = EMPLOYEE + 'registerAsMember'


// memberLoginUsingPassword

export const URL_MEMBER_LOGIN_USING_PASSWORD = EMPLOYEE + 'memberLoginUsingPassword'

// generateSectionQuestions

export const URL_GENERATE_SECTION_QUESTIONS = ASSISTANT + 'generateSectionQuestions'


//memberLoginUsingOtp

export const URL_MEMBER_LOGIN_USING_OTP = EMPLOYEE + 'memberLoginUsingOtp'

// generateFormSectionsandQuestions


export const URL_GENERATE_FORM_SECTIONS_AND_QUESTIONS = ASSISTANT + 'generateFormSectionsandQuestions'

// updateQuestionDetails

export const URL_UPDATE_QUESTION_DETAILS = ASSISTANT + 'updateQuestionDetails'

// get otp

export const URL_GET_OTP = EMPLOYEE + 'getOtp'

// create Schedule

export const URL_CREATE_SCHEDULE = ASSISTANT + 'addCandidateCorporate'

// recordInterviewSession 

export const URL_RECORDER_INTERVIEW_SESSION = ASSISTANT + 'recordInterviewSession'
// create jd varient

export const URL_CREATE_JD_VARIANT = ASSISTANT + 'createJDVariant'

// getJDItemList
export const URL_GET_JD_ITEM_LIST = ASSISTANT + 'getJDItemList'

// get basic Info

export const URL_GET_SCHEDULE_BASIC_INFO = ASSISTANT + 'getScheduleBasicInfo'
export const URL_CREATE_NEW_JD_SCHEDULE = ASSISTANT + 'createNewJdSchedule'

// 
export const URL_CREATE_CORPORATE_VARIANT = ASSISTANT + 'createNewCorporateSchedule'

// getKnowledgeGroupVariantDetails

export const URL_GET_CORPORATE_SCHEDULE_DETAILS = ASSISTANT + 'getCorporateScheduleDetails'


// https://codesubmitprimary.leorainfotech.in/submissions?base64_encoded=true&wait=true

export const STUDENT_CODE_SUBMISSION_URL = 'submissions?base64_encoded=true&wait=true'
export const URL_CLOSE_INTERVIEW = ASSISTANT + 'endInterviewCall'
export const URL_CAN_START_INTERVIEW = ASSISTANT + 'canStartInterview'
export const POST_MANUAL_APPROVALS_ON_CANDIDATE = ASSISTANT + 'manualApprovalsOnCandidate'



// getSectorsCorporate

export const URL_GET_SECTOR_CORPORATE = ASSISTANT + 'getSectorsCorporate'

export const URL_ADD_SECTOR_CORPORATE = ASSISTANT + 'addISectorCorporate'


// addDepartment

export const URL_ADD_DEPARTMENT = COMPANY + 'addDepartment'

// getDepartments

export const URL_GET_DEPARTMENT = COMPANY + 'getDepartments'

// addDesignations

export const URL_ADD_DESIGNATION = EMPLOYEE + 'addDesignation'

// getDesignations

export const URL_GET_FETCH_DESIGNATION = EMPLOYEE + 'getDesignations'

// createCorporateSchedule

export const URL_CREATE_CORPORATE_SCHEDULE = ASSISTANT + 'createCorporateSchedule'

// getCorporateSchedules

export const URL_GET_CORPORATE_SCHEDULE = ASSISTANT + 'getCorporateSchedules'

// createSchedulesSuperAdmin

export const URL_CREATE_SCHEDULES_SUPER_ADMIN = ASSISTANT + 'createScheduleSuperAdmin'
export const URL_GET_INTERVIEW_SCHEDULE_DETAILS = ASSISTANT + 'getInterviewScheduleDetails'

// resetPassword

export const URL_RESET_PASSWORD = EMPLOYEE + 'resetPassword'

// forgotPassword

export const URL_FORGOT_PASSWORD = EMPLOYEE + 'forgotPassword'


/**
 *  reset interview
 */
export const URL_RESET_INTERVIEW = ASSISTANT + 'resetInterview'
export const URL_DELETE_INTERVIEW = ASSISTANT + 'deleteInterview'




/**
 * delete jd
 */
export const URL_DELETE_JD = ASSISTANT + 'deleteJd'

// bulkUploadCandidatesCP

export const URL_BULK_UPLOAD_CANDIDATE_CP = ASSISTANT + 'bulkUploadCandidatesCP'

// getCandidatesCorporate

export const FETCH_CANDIDATES_CORPORATE = ASSISTANT + 'getCandidatesCorporate'


/**
 *  video sync
 */

export const URL_SYNC_VIDEO = ASSISTANT + 'recordInterviewSession'

// corporateScheduleActions

export const POST_CORPORATE_SCHEUDULE_ACTIONS = ASSISTANT + 'corporateScheduleActions'

// addTeamMate

export const URL_ADD_TEAM_MATE_DATA = EMPLOYEE + 'addTeamMate'

// GETTeamMate

export const URL_GET_TEAM_MATE_DATA = EMPLOYEE + 'getTeamMate'


/**
 *  register company corporate
 */

export const URL_REGISTER_AS_COMPANY = EMPLOYEE + 'registerCompanyCorporate'


/**
 * get otp for email verification
 */

export const URL_GET_OTP_FOR_EMAIL_VERIFICATION = EMPLOYEE + 'getOtpForEmailVerification'


/**
 * verify email using otp
 */

export const URL_VERIFY_EMAIL_USING_OTP = EMPLOYEE + 'verifyEmailUsingOtp'

//getOngoingSchedules

export const GRT_ONGOING_SCHEDULES = ASSISTANT + 'getOngoingSchedules'


//employee/getOtpForEmailVerification

export const URL_DASHBOARD = AUTH + 'dashboard'

//get company

export const URL_GETCOMPANY = COMPANY + 'getCompany'







/**
 * 
 */

export const URL_GET_COMPANIES = COMPANY + 'getCompanies'


/*
alter company status
 */

export const URL_ALTER_COMPANY_STATUS = COMPANY + 'alterCompanyStatus'


/*
alter company limits
 */

export const URL_ALTER_COMPANY_LIMIT = COMPANY + 'alterCompanyLimit'


/*
 get recent interviews
 */

export const URL_GET_RECENT_INTERVIEWS = ASSISTANT + 'getRecentInterviews'



//getCandidates

export const URL_GET_CANDIDATES = ASSISTANT + 'getCandidates'


//addCandidate

export const URL_ADD_CANDIDATE = ASSISTANT + 'addCandidate'


/**
 * super admin create company
 */

export const URL_CREATE_COMPANY_SUPER_ADMIN = EMPLOYEE + 'createCompanySuperAdmin'


//get jd section

export const URL_GET_JD_SECTION = ASSISTANT + 'getJDSections'


/**
 * get corporate schedule lite GetCorporateSchedulesLite
 */

export const URL_GET_CORPORATE_SCHEDULES_LITE = ASSISTANT + 'getCorporateSchedulesLite'


/**
 * create opening lite
 */
export const URL_CREATE_OPENING_LITE = ASSISTANT + 'createCorporateOpeningLite'


/**
 * add candidate corporate  lite
 */
export const URL_ADD_CANDIDATE_CORPORATE_LITE = ASSISTANT + 'addCandidateCorporateLite'


/**
 *  switch to Advance
 */

export const URL_SWITCH_TO_ADVANCE = ASSISTANT + 'switchToAdvancedMode'


/** logoutapi */

export const URL_LOGOUT = EMPLOYEE + 'logout'
/* super admin report reGenerate */

export const URL_GENERATED_REPORT= ASSISTANT +'generateReport'

/** recordAuthenticationVideo */

export const URL_RECORD_AUTHENTICATION_VIDEO = ASSISTANT + 'recordAuthenticationVideo'
