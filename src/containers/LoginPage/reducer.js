/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';

import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  loading: false,
  errorMsg: null,
});

function loginPageReducer(state = initialState, { type }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
