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

// getKnowledgeGroups

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


/**
 *  selected client sector
 */


export const setClientSector = (params: any) => {
  return {
    type: ActionTypes.SET_CLIENT_SECTORS,
    payload: params,
  };
};