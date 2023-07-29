import * as ActionTypes from '../ActionTypes'
export const getStartChat = (params: any) => {
  return {
    type: ActionTypes.GET_START_CHAT,
    payload: params,
  };
};

export const getStartChatSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_START_CHAT_SUCCESS,
    payload: response
  }
}

export const getStartChatFailure = (error: any) => {
  return {
    type: ActionTypes.GET_START_CHAT_FAILURE,
    payload: error
  }
}


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
    payload: response
  }
}

export const createKnowledgeGroupFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}

export const createKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error
  }
}


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
    payload: response
  }
}

export const getKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}

export const getKnowledgeGroupsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_KNOWLEDGE_GROUP_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}

export const getSectorsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_SECTORS_FAILURE,
    payload: error
  }
}




// setSelectedRole


export const setSelectedRole = (params) => {
  return {
    type: ActionTypes.SET_SELECTED_ROLE,
    payload: params

  }
}

// createSector


export const createSector = (params: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR,
    payload: params,
  }
}
export const createSectorSuccess = (response: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR_SUCCESS,
    payload: response
  }
}

export const createSectorFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_SECTOR_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}

export const createQuestionFormFailure = (error: any) => {
  return {
    type: ActionTypes.CREATE_QUESTION_FORM_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}

export const getQuestionFormFailure = (error: any) => {
  return {
    type: ActionTypes.GET_QUESTIONS_FORM_FAILURE,
    payload: error
  }
}



/**
 * 
 */


export const generateForm = (params: any) => {
  return {
    type: ActionTypes.GENERATE_FORM,
    payload: params
  }
}

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
    payload: response
  }
}

export const getQuestionSectionFailure = (error: any) => {
  return {
    type: ActionTypes.GET_QUESTION_SECTION_FAILURE,
    payload: error
  }
}

// SET_SELECTED_QUESTION_FORM

export const setSelectedQuestionForm = (params) => {
  return {
    type: ActionTypes.SET_SELECTED_QUESTION_FORM,
    payload: params

  }
}

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
    payload: response
  }
}

export const getFormSectionQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_FORM_SECTION_QUESTIONS_FAILURE,
    payload: error
  }
}



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
    payload: response
  }
}
export const fetchBasicReportFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_BASIC_REPORT_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}
export const getMyPastInterviewsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_MY_PAST_INTERVIEWS_FAILURE,
    payload: error
  }
}


// SELECTED_SCHEDULE_ID

export const selectedScheduleId = (id: any) => {
  return {
    type: ActionTypes.SELECTED_SCHEDULE_ID,
    payload: id
  }
}

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
    payload: response
  }
}
export const fetchGenerateSectionQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_SECTION_QUESTIONS_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}
export const fetchGenerateFormSectionsAndQuestionsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS_FAILURE,
    payload: error
  }
}

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
    payload: response
  }
}
export const fetchUpdateQuestionDetailsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_UPDATE_QUESTION_DETAILS_FAILURE,
    payload: error
  }
}