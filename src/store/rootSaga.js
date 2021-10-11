import {all} from 'redux-saga/effects';
import {getList} from '../screens/Lists/api';

function* rootSaga() {
  yield all([getList()]);
}

export default rootSaga;
