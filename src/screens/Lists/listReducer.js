import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATA_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'EMPTY_ARRAY':
      return {
        ...state,
        data: state.data,
      };

    case 'DATA_SUCCESS':
      return {
        ...state,
        data: [...state.data, ...action.response.hits],
        loading: setTimeout(() => false, 2000),
      };

    case 'DATA_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
