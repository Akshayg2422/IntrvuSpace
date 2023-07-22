import { post } from '../ApiHelper';
import * as URL from '../UrlHelper'

export const getStartChatApi = payload => post(URL.GET_START_CHAT, payload, {});

// createKnowledgeGroup

export const createKnowledgeGroupApi = payload => post(URL.CREATE_KNOWLEDGE_GROUP_URL, payload, {});


// createKnowledgeGroupVariant

export const createKnowledgeGroupVariantApi = payload => post(URL.CREATE_KNOWLEDGE_GROUP_VARIANT_URL, payload, {});

// getKnowledgeGroup

export const getKnowledgeGroupApi = payload => post(URL.GET_KNOWLEDGE_GROUP_URL, payload, {});

// getKnowledgeGroupVariant

export const getKnowledgeGroupVariantApi = payload => post(URL.GET_KNOWLEDGE_GROUP_VARIANT_URL, payload, {});
export const getSectorsApi = payload => post(URL.URL_GET_SECTORS, payload, {});

//createQuestionForm
export const createQuestionForm = payload => post(URL.URL_CREATE_QUESTION_FORM, payload, {});



