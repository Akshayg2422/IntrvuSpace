import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'


function* getChatSaga(action) {
  try {
    const response = yield call(Api.getStartChatApi, action.payload.params);
    if (response.success) {
      yield put(Action.getStartChatSuccess(response));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(Action.getStartChatFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getStartChatFailure(error));
    yield call(action.payload.onError(error));
  }
}

// createKnowledgeGroupVariant

function* createKnowledgeGroupVariantSaga(action) {
  try {
    const response = yield call(Api.createKnowledgeGroupVariantApi, action.payload.params);
    if (response.success) {
      yield put(Action.createKnowledgeGroupVariantSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.createKnowledgeGroupVariantFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createKnowledgeGroupVariantFailure(error));
    yield call(action.payload.onError(error));
  }
}

// createKnowledgeGroup

function* createKnowledgeGroupSaga(action) {
  try {
    const response = yield call(Api.createKnowledgeGroupApi, action.payload.params);
    if (response.success) {
      yield put(Action.createKnowledgeGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.createKnowledgeGroupFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createKnowledgeGroupFailure(error));
    yield call(action.payload.onError(error));
  }
}

// getKnowledgeGroups

function* getKnowledgeGroupSaga(action) {
  try {
    const response = yield call(Api.getKnowledgeGroupApi, action.payload.params);
    if (response.success) {
      yield put(Action.getKnowledgeGroupsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getKnowledgeGroupsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createKnowledgeGroupFailure(error));
    yield call(action.payload.onError(error));
  }
}

// getKnowledgeGroupVariant

function* getKnowledgeGroupVariantSaga(action) {
  try {
    const response = yield call(Api.getKnowledgeGroupVariantApi, action.payload.params);
    if (response.success) {
      yield put(Action.getKnowledgeGroupVariantSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getKnowledgeGroupVariantFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getKnowledgeGroupVariantFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* createSectorSaga(action) {
  try {
    const response = yield call(Api.createSectorApi, action.payload.params);
    if (response.success) {
      yield put(Action.createSectorSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.createSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createSectorFailure(error));
  }
}

// get sectors

function* getSectorsSaga(action) {
  try {
    const response = yield call(Api.getSectorsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getSectorsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getSectorsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getSectorsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// create question form

function* createQuestionFormSaga(action) {
  try {
    const response = yield call(Api.createQuestionForm, action.payload.params);
    if (response.success) {
      yield put(Action.createQuestionFormSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.createQuestionFormFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createQuestionFormFailure(error));
    yield call(action.payload.onError(error));
  }
}

// get question form

function* getQuestionFormSaga(action) {
  try {
    const response = yield call(Api.getQuestionFormApi, action.payload.params);
    console.log(JSON.stringify(response));
    if (response.success) {
      yield put(Action.getQuestionFormSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getQuestionFormFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getQuestionFormFailure(error));
    yield call(action.payload.onError(error));
  }
}




// get basic report

function* getBasicReportSaga(action) {
  try {
    const response = yield call(Api.getBasicReportApi, action.payload.params);
    if (response.success) {
      yield put(Action.fetchBasicReportSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.fetchBasicReportFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.fetchBasicReportFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * form
 * 
 */


// create question section

function* createQuestionSectionSage(action) {
  try {
    const response = yield call(Api.createQuestionSectionApi, action.payload.params);
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield call(action.payload.onError(error));
  }
}

function* generateFormSaga(action) {
  try {
    const response = yield call(Api.generateFormApi, action.payload.params);
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield call(action.payload.onError(error));
  }
}

// get question section

function* getQuestionSectionSaga(action) {
  try {
    const response = yield call(Api.getQuestionSectionApi, action.payload.params);
    if (response.success) {
      yield put(Action.getQuestionSectionSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getQuestionSectionFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getQuestionSectionFailure(error));
    yield call(action.payload.onError(error));
  }
}

// GET_FORM_SECTION_QUESTIONS

function* getFormSectionsQuestionsSaga(action) {
  try {
    const response = yield call(Api.getFormSectionsQuestionsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getFormSectionQuestionsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getFormSectionQuestionsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getFormSectionQuestionsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// getMyPastInterviews

function* getMyPastInterviewsSaga(action) {
  try {
    const response = yield call(Api.getMyPastInterviewsApi, action.payload.params);

    if (response.success) {
      yield put(Action.getMyPastInterviewsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getMyPastInterviewsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getMyPastInterviewsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// generateSectionQuestionsApi

function* generateSectionQuestionsSaga(action) {
  try {
    const response = yield call(Api.generateSectionQuestionsApi, action.payload.params);
    if (response.success) {
      yield put(Action.fetchGenerateSectionQuestionsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.fetchGenerateSectionQuestionsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.fetchGenerateSectionQuestionsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// generateFormSectionsandQuestions

function* generateFormSectionsAndQuestionsSaga(action) {
  try {
    const response = yield call(Api.generateFormSectionsAndQuestionsApi, action.payload.params);
    console.log(JSON.stringify(response) + '========getMyPastInterviewsSaga');
    if (response.success) {
      yield put(Action.fetchGenerateFormSectionsAndQuestionsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.fetchGenerateFormSectionsAndQuestionsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.fetchGenerateFormSectionsAndQuestionsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// updateQuestionDetailsApi

function* updateQuestionDetailsApiSaga(action) {
  try {
    const response = yield call(Api.updateQuestionDetailsApi, action.payload.params);
    if (response.success) {
      yield put(Action.fetchUpdateQuestionDetailsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.fetchUpdateQuestionDetailsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.fetchUpdateQuestionDetailsFailure(error));
    yield call(action.payload.onError(error));
  }
}

// CREATE_SCHEDULE

function* createScheduleSaga(action) {
  try {
    const response = yield call(Api.PostCreateScheduleApi, action.payload.params);
    if (response.success) {
      yield put(Action.createScheduleSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.createScheduleFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.createScheduleFailure(error));
    yield call(action.payload.onError(error));
  }
}

// INTERVIEW_RECORDER_SESSION

function* recordInterviewSessionSaga(action) {
  try {
    const response = yield call(Api.PostRecorderInterviewSessionApi, action.payload.params);
    if (response.success) {
      yield put(Action.recordInterviewSessionSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.recordInterviewSessionFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.recordInterviewSessionFailure(error));
  }
}
// create jd variant

function* postJdVariantSaga(action) {
  try {
    const response = yield call(Api.postJdVariantApi, action.payload.params);
    if (response.success) {
      yield put(Action.postJdVariantSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.postJdVariantFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.postJdVariantFailure(error));
    yield call(action.payload.onError(error));
  }
}



// get jd item list

function* getJdItemListSaga(action) {
  try {
    const response = yield call(Api.getJdItemList, action.payload.params);
    if (response.success) {
      yield put(Action.getJdItemListSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getJdItemListFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getJdItemListFailure(error));
    yield call(action.payload.onError(error));
  }
}

// getScheduleBasicInfo

function* getScheduleBasicInfoSaga(action) {
  try {
    const response = yield call(Api.getScheduleBasicInfo, action.payload.params);
    if (response.success) {
      yield put(Action.getScheduleBasicInfoSuccess(response?.details?.schedule_details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getScheduleBasicInfoFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getScheduleBasicInfoFailure(error));
    yield call(action.payload.onError(error));
  }
}



// createNewJdSchedule
function* createNewJdScheduleSaga(action) {
  try {
    const response = yield call(Api.createNewJdSchedule, action.payload.params);
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield call(action.payload.onError(error));
  }
}



function* DashboardSaga() {
  yield takeLatest(Action.GET_START_CHAT, getChatSaga);
  yield takeLatest(Action.CREATE_KNOWLEDGE_GROUP_VARIANT, createKnowledgeGroupVariantSaga);
  yield takeLatest(Action.CREATE_KNOWLEDGE_GROUP, createKnowledgeGroupSaga);
  yield takeLatest(Action.GET_KNOWLEDGE_GROUP, getKnowledgeGroupSaga);
  yield takeLatest(Action.GET_KNOWLEDGE_GROUP_VARIANT, getKnowledgeGroupVariantSaga);
  yield takeLatest(Action.CREATE_SECTOR, createSectorSaga);
  yield takeLatest(Action.GET_SECTORS, getSectorsSaga);
  yield takeLatest(Action.CREATE_QUESTION_FORM, createQuestionFormSaga);
  yield takeLatest(Action.CREATE_QUESTION_SECTION, createQuestionSectionSage);
  yield takeLatest(Action.GET_QUESTIONS_FORM, getQuestionFormSaga);
  yield takeLatest(Action.GENERATE_FORM, generateFormSaga);
  yield takeLatest(Action.GET_QUESTION_SECTION, getQuestionSectionSaga);
  yield takeLatest(Action.GET_FORM_SECTION_QUESTIONS, getFormSectionsQuestionsSaga);
  yield takeLatest(Action.FETCH_BASIC_REPORT, getBasicReportSaga);
  yield takeLatest(Action.GET_MY_PAST_INTERVIEWS, getMyPastInterviewsSaga);
  yield takeLatest(Action.FETCH_GENERATE_SECTION_QUESTIONS, generateSectionQuestionsSaga);
  yield takeLatest(Action.FETCH_GENERATE_FORM_SECTIONS_AND_QUESTIONS, generateFormSectionsAndQuestionsSaga);
  yield takeLatest(Action.FETCH_UPDATE_QUESTION_DETAILS, updateQuestionDetailsApiSaga);
  yield takeLatest(Action.CREATE_SCHEDULE, createScheduleSaga);
  yield takeLatest(Action.INTERVIEW_RECORDER_SESSION, recordInterviewSessionSaga);
  yield takeLatest(Action.POST_JD_VARIANT, postJdVariantSaga);
  yield takeLatest(Action.GET_JD_ITEM_LIST, getJdItemListSaga);
  yield takeLatest(Action.GET_SCHEDULE_BASIC_INFO, getScheduleBasicInfoSaga);
  yield takeLatest(Action.CREATE_NEW_JD_SCHEDULE, createNewJdScheduleSaga);

}
export default DashboardSaga;
