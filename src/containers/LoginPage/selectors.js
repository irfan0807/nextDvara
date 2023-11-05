import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */

// const selectMobileNumber = () =>
//   createSelector(selectLoginPageDomain, substate => substate.get('mobile'));

// const selectPassword = () =>
//   createSelector(selectLoginPageDomain, substate => substate.get('password'));

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

export default makeSelectLoginPage;
export { selectLoginPageDomain };
