import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the operationsHomePage state domain
 */

const selectOperationsHomePageDomain = state =>
  state.get('operationsHomePage', initialState);

/**
 * Other specific selectors
 */
const selectLoading = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('loading'),
  );

const selectCattleData = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('cattle').toJS(),
  );

const selectDataList = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('dataList').toJS(),
  );

const selectDataList1 = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('dataList1').toJS(),
  );

const selectFarmerDetails = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('farmer').toJS(),
  );

const selectFilterOpen = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('open'),
  );

const selectFilterValue = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('filter'),
  );

const selectMonth = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('month'),
  );

const selectYear = () =>
  createSelector(selectOperationsHomePageDomain, substate =>
    substate.get('year'),
  );
/**
 * Default selector used by OperationsHomePage
 */

const makeSelectOperationsHomePage = () =>
  createSelector(selectOperationsHomePageDomain, substate => substate.toJS());

export default makeSelectOperationsHomePage;
export {
  selectOperationsHomePageDomain,
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
