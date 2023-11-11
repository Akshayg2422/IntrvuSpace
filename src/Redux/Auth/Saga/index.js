import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'



// register as member

function* registerAsMemberSaga(action) {
    try {
        const response = yield call(Api.registerAsMemberAPi, action.payload.params);
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

//get otp

function* fetchOtpSaga(action) {
    try {
        const response = yield call(Api.fetchOTPApi, action.payload.params);
        if (response) {
            yield put(Action.fetchOTPSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.fetchOTPFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.fetchOTPFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get member using login otp

function* fetchMemberLoginUsingOtpSaga(action) {
    try {
        const response = yield call(Api.fetchMemberLoginUsingOtpApi, action.payload.params);
        if (response) {
            yield put(Action.fetchMemberUsingLoginOtpSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.fetchMemberUsingLoginOtpFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.fetchMemberUsingLoginOtpFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * register company
 * @param {} action 
 */

function* registerAsCompanySaga(action) {
    try {
        const response = yield call(Api.registerAsCompanyApi, action.payload.params);
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
 * verify email (Submit api dont need success and failure state)
 */

function* getOtpForEmailVerificationSaga(action) {
    try {
        const response = yield call(Api.getOtpForEmailVerificationAPi, action.payload.params);
        if (response) {
            yield call(action.payload.onSuccess(response));
        } else {
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield call(action.payload.onError(error));
    }
}


/**
 * verify email (Submit api dont need success and failure state)
 */

function* verifyEmailUsingOtpSaga(action) {
    try {
        const response = yield call(Api.verifyEmailUsingOtpApi, action.payload.params);
        if (response.success) {
            yield call(action.payload.onSuccess(response));
        } else {
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield call(action.payload.onError(error));
    }
}


function* AuthSaga() {

    yield takeLatest(Action.MEMBER_LOGIN_USING_PASSWORD, memberLoginUsingPasswordSaga);
    yield takeLatest(Action.REGISTER_AS_MEMBER, registerAsMemberSaga);
    yield takeLatest(Action.FETCH_OTP, fetchOtpSaga);
    yield takeLatest(Action.FETCH_MEMBER_USING_LOGIN_OTP, fetchMemberLoginUsingOtpSaga);
    yield takeLatest(Action.REGISTER_AS_COMPANY, registerAsCompanySaga);
    yield takeLatest(Action.GET_OTP_FOR_EMAIL_VERIFICATION, getOtpForEmailVerificationSaga);
    yield takeLatest(Action.VERIFY_EMAIL_USING_OTP, verifyEmailUsingOtpSaga);
}

export default AuthSaga;