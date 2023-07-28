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


export const URL_REGISTER_AS_MEMBER = EMPLOYEE + 'registerAsMember'



