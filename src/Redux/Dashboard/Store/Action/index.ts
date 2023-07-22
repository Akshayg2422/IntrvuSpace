import * as ActionTypes from '../ActionTypes'
import { CREATE_KNOWLEDGE_GROUP, CREATE_KNOWLEDGE_GROUP_FAILURE, CREATE_KNOWLEDGE_GROUP_SUCCESS, CREATE_KNOWLEDGE_GROUP_VARIANT, CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_KNOWLEDGE_GROUP, GET_KNOWLEDGE_GROUP_FAILURE, GET_KNOWLEDGE_GROUP_SUCCESS, GET_KNOWLEDGE_GROUP_VARIANT, GET_KNOWLEDGE_GROUP_VARIANT_FAILURE, GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS, GET_START_CHAT, GET_START_CHAT_FAILURE, GET_START_CHAT_SUCCESS } from '../ActionTypes';



export const getStartChat = (params: any) => {
  return {
    type: GET_START_CHAT,
    payload: params,
  };
};

export const getStartChatSuccess = (response: any) => {

  return {
    type: GET_START_CHAT_SUCCESS,
    payload: response
  }
}

export const getStartChatFailure = (error: any) => {
  return {
    type: GET_START_CHAT_FAILURE,
    payload: error
  }
}


// createKnowledgeGroup

export const createKnowledgeGroup = (params: any) => {
  return {
    type: CREATE_KNOWLEDGE_GROUP,
    payload: params,
  };
};

export const createKnowledgeGroupSuccess = (response: any) => {

  return {
    type: CREATE_KNOWLEDGE_GROUP_SUCCESS,
    payload: response
  }
}

export const createKnowledgeGroupFailure = (error: any) => {
  return {
    type: CREATE_KNOWLEDGE_GROUP_FAILURE,
    payload: error
  }
}

// createKnowledgeGroupVariant

export const createKnowledgeGroupVariant = (params: any) => {
  return {
    type: CREATE_KNOWLEDGE_GROUP_VARIANT,
    payload: params,
  };
};

export const createKnowledgeGroupVariantSuccess = (response: any) => {

  return {
    type: CREATE_KNOWLEDGE_GROUP_VARIANT_SUCCESS,
    payload: response
  }
}

export const createKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error
  }
}


// getKnowledgeGroupVariant

export const getKnowledgeGroupVariant = (params: any) => {
  return {
    type: GET_KNOWLEDGE_GROUP_VARIANT,
    payload: params,
  };
};

export const getKnowledgeGroupVariantSuccess = (response: any) => {

  return {
    type: GET_KNOWLEDGE_GROUP_VARIANT_SUCCESS,
    payload: response
  }
}

export const getKnowledgeGroupVariantFailure = (error: any) => {
  return {
    type: GET_KNOWLEDGE_GROUP_VARIANT_FAILURE,
    payload: error
  }
}

// getKnowledgeGroup

export const getKnowledgeGroup = (params: any) => {
  return {
    type: GET_KNOWLEDGE_GROUP,
    payload: params,
  };
};

export const getKnowledgeGroupSuccess = (response: any) => {
  return {
    type: GET_KNOWLEDGE_GROUP_SUCCESS,
    payload: response
  }
}

export const getKnowledgeGroupFailure = (error: any) => {
  return {
    type: GET_KNOWLEDGE_GROUP_FAILURE,
    payload: error
  }
}

// selectedGroupIds

export const selectedGroupIds=(params)=>{
  return {
      type: ActionTypes.SELECTED_GROUP_ID,
      payload: params
  }
}