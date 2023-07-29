import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'



// register as member

function* registerAsMemberSaga(action) {
    try {
        const response = yield call(Api.registerAsMemberAPi, action.payload.params);
        console.log(JSON.stringify(response) + '========getMyPastInterviewsSaga');
        if (response.success) {
            yield put(Action.registerAsMemberSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.registerAsMemberFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.registerAsMemberFailure(error));
        yield call(action.payload.onError(error));
    }
}

//memberLoginUsingPassword

function* memberLoginUsingPasswordSaga(action) {
    try {
        const response = yield call(Api.memberLoginUsingPasswordApi, action.payload.params);
        console.log(JSON.stringify(response) + '========memberLoginUsingPasswordSuccess');
        if (response) {
            yield put(Action.memberLoginUsingPasswordSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.memberLoginUsingPasswordFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.memberLoginUsingPasswordFailure(error));
        yield call(action.payload.onError(error));
    }
}

function* AuthSaga() {

    yield takeLatest(Action.MEMBER_LOGIN_USING_PASSWORD, memberLoginUsingPasswordSaga);
    yield takeLatest(Action.REGISTER_AS_MEMBER, registerAsMemberSaga);


}

export default AuthSaga;