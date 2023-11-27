import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import DashboardSaga from '../Dashboard/Saga';
import AuthSaga from '../Auth/Saga';
import SuperAdminSaga from '../SuperAdmin/Saga';
import AdminSaga from '../Admin/Saga';



export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AdminSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(DashboardSaga)]);
  yield all([fork(SuperAdminSaga)]);
}
