import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'


/**
 * get Api sagas
 */

function* getCandidatesSaga(action) {
    try {
        const response = yield call(Api.getCandidatesApi, action.payload.params);
        if (response.success) {
            yield put(Action.getCandidatesSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getCandidatesFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getCandidatesFailure(error));
        yield call(action.payload.onError(error));
    }
}



// get jd section

function* getJdSectionSaga(action) {
    try {
        const response = yield call(Api.getJdSectionApi, action.payload.params);
        if (response.success) {
            yield put(Action.getJdSectionSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getJdSectionFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getJdSectionFailure(error));
        yield call(action.payload.onError(error));
    }
}

// get jd section

function* getCorporateSchedulesLiteSaga(action) {
    try {
        const response = yield call(Api.getCorporateScheduleLiteApi, action.payload.params);

        if (response.success) {
            yield put(Action.getCorporateSchedulesLiteSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getCorporateSchedulesLiteFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getCorporateSchedulesLiteFailure(error));
        yield call(action.payload.onError(error));
    }
}





/**
 * post Api sagas 
 * no need to add redux success and failure action, i need to store add us will use action
 */

function* addCandidatesSaga(action) {
    try {
        const response = yield call(Api.addCandidatesApi, action.payload.params);
        if (response.success) {
            yield call(action.payload.onSuccess(response));
        } else {

            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield call(action.payload.onError(error));
    }
}

function* createCorporateOpeningLiteSaga(action) {
    try {
        const response = yield call(Api.createOpeningLiteApi, action.payload.params);
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
 * add candidate lite saga
 */
function* addCandidateCorporateLiteSaga(action) {
    try {
        const response = yield call(Api.addCandidateCorporateLiteApi, action.payload.params);
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
 * postRecordAuthenticationVideoSaga
 */

function* postRecordAuthenticationVideoSaga(action) {
    try {
        const response = yield call(Api.recordAuthenticationVideoApi, action.payload.params);
        if (response.success) {
            yield call(action.payload.onSuccess(response));
        } else {
            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield call(action.payload.onError(error));
    }
}



function* AdminSaga() {

    yield takeLatest(Action.GET_CANDIDATES, getCandidatesSaga);
    yield takeLatest(Action.ADD_CANDIDATES, addCandidatesSaga);
    yield takeLatest(Action.GET_JD_SECTION, getJdSectionSaga);
    yield takeLatest(Action.GET_CORPORATE_SCHEDULES_LITE, getCorporateSchedulesLiteSaga);
    yield takeLatest(Action.CREATE_CORPORATE_OPENING_LITE, createCorporateOpeningLiteSaga);
    yield takeLatest(Action.ADD_CANDIDATE_CORPORATE_LITE, addCandidateCorporateLiteSaga);
    yield takeLatest(Action.POST_RECORD_AUTHENTICATION_VIDEO, postRecordAuthenticationVideoSaga);

}


export default AdminSaga;
