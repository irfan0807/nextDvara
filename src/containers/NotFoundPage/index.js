import React from 'react';
import DvaraLogo from '../../images/dvara.jpg';
import { ImageWrapper, ImageContainer } from './elements';

const NotFound = () => {
  return (
    <ImageContainer>
      <ImageWrapper src={DvaraLogo} alt="dvara" />
    </ImageContainer>
  );
};

export default NotFound;
