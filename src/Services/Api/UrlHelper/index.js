/**
 * sample api
 */
const ASSISTANT = '/ivoassistant/'
const EMPLOYEE = '/employee/'


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

export const URL_CREATE_SCHEDULE = ASSISTANT + 'createSchedule'

// recordInterviewSession 

export const URL_RECORDER_INTERVIEW_SESSION = ASSISTANT + 'recordInterviewSession'
// create jd varient

export const URL_CREATE_JD_VARIANT = ASSISTANT + 'createJDVariant'

// getJDItemList
export const URL_GET_JD_ITEM_LIST = ASSISTANT + 'getJDItemList'

// get basic Info

export const URL_GET_SCHEDULE_BASIC_INFO = ASSISTANT + 'getScheduleBasicInfo'
