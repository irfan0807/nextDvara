/**
 *
 * Asynchronously loads the component for BulkEditPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
