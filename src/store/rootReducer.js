import {combineReducers} from 'redux';
import {listReducer} from '../screens/Lists/listReducer';

export const combinedReducers = combineReducers({
  list: listReducer,
});
