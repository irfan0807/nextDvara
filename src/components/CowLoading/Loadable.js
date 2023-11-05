/**
 *
 * Asynchronously loads the component for PageLoading
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
