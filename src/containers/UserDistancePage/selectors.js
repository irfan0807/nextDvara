import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the UserManagement state domain
 */

const selectUserManagementDomain = state =>
  state.get('UserManagement', initialState);

/**
 * Other specific selectors
 */
const selectLoading = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('loading'),
  );

const selectCattleData = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('cattle').toJS(),
  );

const selectDataList = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('dataList').toJS(),
  );

const selectDataList1 = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('dataList1').toJS(),
  );

const selectFarmerDetails = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('farmer').toJS(),
  );

const selectFilterOpen = () =>
  createSelector(selectUserManagementDomain, substate => substate.get('open'));

const selectFilterValue = () =>
  createSelector(selectUserManagementDomain, substate =>
    substate.get('filter'),
  );

const selectMonth = () =>
  createSelector(selectUserManagementDomain, substate => substate.get('month'));

const selectYear = () =>
  createSelector(selectUserManagementDomain, substate => substate.get('year'));
/**
 * Default selector used by UserManagement
 */

const makeSelectUserManagement = () =>
  createSelector(selectUserManagementDomain, substate => substate.toJS());

export default makeSelectUserManagement;
export {
  selectUserManagementDomain,
  selectCattleData,
  selectDataList,
  selectDataList1,
  selectLoading,
  selectFarmerDetails,
  selectFilterValue,
  selectFilterOpen,
  selectMonth,
  selectYear,
};
