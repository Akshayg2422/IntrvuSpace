import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import DashboardSaga from '../Dashboard/Saga';

export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(DashboardSaga)]);

}
