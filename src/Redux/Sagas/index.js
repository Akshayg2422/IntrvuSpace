import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import DashboardSaga from '../Dashboard/Saga';
import AuthSaga from '../Auth/Saga';


export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(DashboardSaga)]);

}
