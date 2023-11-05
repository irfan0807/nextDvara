/*
 *
 * UserManagement reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_FARMER_DATA,
  FETCH_FARMER_DATA_SUCCESS,
  FETCH_FARMER_DATA_FAIL,
  FETCH_CATTLE_DATA,
  FETCH_CATTLE_DATA_SUCCESS,
  FETCH_CATTLE_DATA_FAIL,
  FILTER_OPEN,
  UPDATE_YEAR,
  UPDATE_MONTH,
} from './constants';

export const initialState = fromJS({
  loading: false,
  cattle: [],
  dataList: [],
  dataList1: [],
  farmer: [],
  open: true,
  filter: false,
  month: '',
  year: '',
});

function UserManagementReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_FARMER_DATA:
      return state
        .set('loading', true)
        .set('farmer', fromJS([]))
        .set('month', '')
        .set('year', '')
        .set('dataList1', fromJS([]));
    case FETCH_FARMER_DATA_SUCCESS:
      return state
        .set('dataList1', fromJS(payload.dataList1))
        .set('farmer', fromJS(payload.farmerDetails))
        .set('month', payload.month)
        .set('year', payload.year)
        .set('loading', false);
    case FETCH_FARMER_DATA_FAIL:
      return state
        .set('loading', false)
        .set('farmer', fromJS([]))
        .set('month', '')
        .set('year', '')
        .set('dataList', fromJS([]));
    case FETCH_CATTLE_DATA:
      return state
        .set('loading', true)
        .set('cattle', fromJS([]))
        .set('farmer', fromJS([]))
        .set('month', '')
        .set('year', '')
        .set('dataList', fromJS([]));
    case FETCH_CATTLE_DATA_SUCCESS:
      return state
        .set('cattle', fromJS(payload.cattleDetails))
        .set('dataList', fromJS(payload.dataList))
        .set('farmer', fromJS(payload.farmerDetails))
        .set('month', payload.month)
        .set('year', payload.year)
        .set('loading', false);
    case FETCH_CATTLE_DATA_FAIL:
      return state
        .set('loading', false)
        .set('cattle', fromJS([]))
        .set('farmer', fromJS([]))
        .set('month', '')
        .set('year', '')
        .set('dataList', fromJS([]));
    case FILTER_OPEN:
      return state.set(`${payload}`, !state.get(`${payload}`));
    case UPDATE_YEAR:
      return state.set('year', payload);
    case UPDATE_MONTH:
      return state.set('month', payload);
    default:
      return state;
  }
}

export default UserManagementReducer;
