import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
 import * as Action from  '../Store'

function* SuperAdminSaga(action) {
    try {
        const response = yield call(Api.getCompanies, action.payload.params);
        if (response.success) {
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
export default SuperAdminSaga;
