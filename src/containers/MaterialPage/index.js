import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { MaterialPageContainer } from './elements';

const MaterialPage = ({ match }) => {
  const {
    params: { id },
  } = match;

  return (
    <MaterialPageContainer>
      <Helmet>
        {/* <title>MaterialPage</title> */}
        <meta name="description" content="Description of MaterialPage" />
      </Helmet>
      {id === '1' ? (
        <embed
          src="https://firebasestorage.googleapis.com/v0/b/edairy-7fcc9.appspot.com/o/cattle_manage_docs%2FDvaraE-DairyCattleManagement.pdf?alt=media&token=6b69cf40-f972-4492-b67f-a36475b82353#toolbar=0&navpanes=0&scrollbar=0"
          height="100%"
          width="100%"
        />
      ) : (
        ''
      )}

      {id === '2' ? (
        <embed
          src="https://firebasestorage.googleapis.com/v0/b/edairy-7fcc9.appspot.com/o/cattle_manage_docs%2FSummer%20management%20of%20dairy%20cows.pdf?alt=media&token=4d72f646-65fd-46bb-ab78-935c56e3448e#toolbar=0&navpanes=0&scrollbar=0"
          height="100%"
          width="100%"
        />
      ) : (
        ''
      )}
    </MaterialPageContainer>
  );
};

MaterialPage.propTypes = {
  match: PropTypes.object,
};

export default MaterialPage;
