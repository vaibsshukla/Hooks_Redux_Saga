import {put, takeLatest} from 'redux-saga/effects';
import {getList} from './api';

function* genFunGetList({payload}) {
  try {
    const response = yield getList(payload);
    console.log('response' + JSON.stringify(response));
    yield put({type: 'DATA_SUCCESS', response});
  } catch (error) {
    yield put({type: 'DATA_FAILURE', error: error.message});
  }
}

export default function* listScreenSaga() {
  yield takeLatest('DATA_REQUEST', genFunGetList);
}
