import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Action from '../Store'


/**
 * get Api sagas
 */

    function* getCandidatesSaga(action) {
        try {
            const response = yield call(Api.getCandidatesApi, action.payload.params);
            if (response) {
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




/**
 * post Api sagas 
 * no need to add redux success and failure action, i need to store add us will use action
 */

function* addCandidatesSaga(action) {
    try {
        const response = yield call(Api.addCandidatesApi, action.payload.params);
        if (response) {
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

  }


export default AdminSaga;