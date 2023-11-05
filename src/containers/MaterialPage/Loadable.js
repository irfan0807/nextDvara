/**
 *
 * Asynchronously loads the component for MaterialPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
