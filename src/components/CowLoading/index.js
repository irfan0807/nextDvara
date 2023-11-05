/**
 *
 * CowLoading
 *
 */

import React from 'react';
import {
  CowLoadingContainer,
  CowLoadingWrapper,
  CowLoadingElement,
  CowLoadingElementWrapper,
  CowLoadingElementWrapperAlt,
} from './elements';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import cowloader from '../../images/cowloader.gif';


function CowLoading() {
  return (
    <CowLoadingContainer>
      <CowLoadingWrapper>
      <img src={cowloader} alt='cow loader' style={{height:'200px'}}/>
      </CowLoadingWrapper>
    </CowLoadingContainer>
  );
}

CowLoading.propTypes = {};

export default CowLoading;
