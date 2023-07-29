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




