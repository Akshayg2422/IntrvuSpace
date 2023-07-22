import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'


function* getChatSaga(action) {
  try {
    const response = yield call(Api.getStartChatApi, action.payload.params);
    if (response.success) {
      yield put(Action.getStartChatSuccess(response));
      yield call(action.payload.onSuccess(response));
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
      yield put(Action.getKnowledgeGroupsSuccess(response.details));
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


function* DashboardSaga() {
  yield takeLatest(Action.GET_START_CHAT, getChatSaga);
  yield takeLatest(Action.CREATE_KNOWLEDGE_GROUP_VARIANT, createKnowledgeGroupVariantSaga);
  yield takeLatest(Action.CREATE_KNOWLEDGE_GROUP, createKnowledgeGroupSaga);
  yield takeLatest(Action.GET_KNOWLEDGE_GROUP, getKnowledgeGroupSaga);
  yield takeLatest(Action.GET_KNOWLEDGE_GROUP_VARIANT, getKnowledgeGroupVariantSaga);
  yield takeLatest(Action.GET_SECTORS, getSectorsSaga);

}

export default DashboardSaga;
