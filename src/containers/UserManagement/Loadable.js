/**
 *
 * Asynchronously loads the component for UserManagement
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
