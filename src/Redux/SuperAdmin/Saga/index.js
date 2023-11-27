import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'
import { t } from 'i18n-js';


/**
 * get Dashboard saga
} action 
 */

function* getCompaniesSaga(action) {
    try {
        const response = yield call(Api.getCompaniesApi, action.payload.params);
        if (response) {
            yield put(Action.getCompaniesSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getCompaniesFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getCompaniesFailure(error));
        yield call(action.payload.onError(error));
    }
}




/**
 * alter company status
 */


function* alterCompanyStatusSaga(action) {
  try {
    const response = yield call(Api.alterCompanyStatusApi, action.payload.params);
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }

  } catch (error) {
    yield call(action.payload.onError(error));
  }
}

/**
 * alter company limits
 */


function* alterCompanyLimitSaga(action) {
  try {
    const response = yield call(Api.alterCompanyLimitApi, action.payload.params);
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }

  } catch (error) {
    yield call(action.payload.onError(error));
  }
}

/**
 *  recent interviews
 */
function* getRecentInterviewsSaga(action) {
  try {
      const response = yield call(Api.getRecentInterviewsApi, action.payload.params);
      if (response) {
          yield put(Action.getRecentInterviewsSuccess(response));
          yield call(action.payload.onSuccess(response));
      } else {
          yield put(Action.getRecentInterviewsFailure(response.error_message));
          yield call(action.payload.onError(response));
      }
  } catch (error) {
      yield put(Action.getRecentInterviewsFailure(error));
      yield call(action.payload.onError(error));
  }
}


function* SuperAdminSaga() {
  yield takeLatest(Action.GET_COMPANIES, getCompaniesSaga);
  yield takeLatest(Action.ALTER_COMPANY_STATUS,alterCompanyStatusSaga);
  yield takeLatest(Action.ALTER_COMPANY_LIMIT,alterCompanyLimitSaga);
  yield takeLatest(Action.GET_RECENT_INTERVIEWS,getRecentInterviewsSaga);

}
export default SuperAdminSaga;
