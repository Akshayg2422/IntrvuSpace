import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppReducer, DashboardReducer, AuthReducer, SuperAdminReducer, AdminReducer } from '@Redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import rootSaga from '../Sagas';

const persistConfig = {
  key: 'quanta-tms',
  storage,
}

const reducer = combineReducers({
  AppReducer,
  DashboardReducer,
  AuthReducer,
  SuperAdminReducer,
  AdminReducer
});

const rootReducer = (state: any, action: any) => {

  if (action.type === 'USER_LOGOUT') {
    try {
      localStorage.clear();
      action.payload.onSuccess();
      return reducer(undefined, action);
    } catch {
      action.payload.onError();
    }
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(sagaMiddleware)),
);

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, sagaMiddleware, rootSaga, persistor };
