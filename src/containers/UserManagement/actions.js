/*
 *
 * UserManagement actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_FARMER_DATA,
  FETCH_FARMER_DATA_SUCCESS,
  FETCH_FARMER_DATA_FAIL,
  FETCH_CATTLE_DATA,
  FETCH_CATTLE_DATA_SUCCESS,
  FETCH_CATTLE_DATA_FAIL,
  FILTER_OPEN,
  UPDATE_MONTH,
  UPDATE_YEAR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchFarmerData() {
  return {
    type: FETCH_FARMER_DATA,
  };
}

export function fetchFarmerDataSuccess(payload) {
  return {
    type: FETCH_FARMER_DATA_SUCCESS,
    payload,
  };
}

export function fetchFarmerDataFail() {
  return {
    type: FETCH_FARMER_DATA_FAIL,
  };
}

export function fetchCattleData() {
  return {
    type: FETCH_CATTLE_DATA,
  };
}

export function fetchCattleDataSuccess(payload) {
  return {
    type: FETCH_CATTLE_DATA_SUCCESS,
    payload,
  };
}

export function updateIsFilterOpen(payload) {
  return {
    type: FILTER_OPEN,
    payload,
  };
}

export function fetchCattleDataFail() {
  return {
    type: FETCH_CATTLE_DATA_FAIL,
  };
}

export function updateMonth(payload) {
  return {
    type: UPDATE_MONTH,
    payload,
  };
}

export function updateYear(payload) {
  return {
    type: UPDATE_YEAR,
    payload,
  };
}
