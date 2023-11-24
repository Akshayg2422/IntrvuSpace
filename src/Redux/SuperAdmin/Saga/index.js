import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'


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


function* SuperAdminSaga() {
    yield takeLatest(Action.GET_COMPANIES, getCompaniesSaga);
}
export default SuperAdminSaga;
