import React from 'react';
import PropTypes from 'prop-types';

import { InputContainer, IconWrapper, TextInput } from './elements';

function Input(props) {
  const { icon, className, ...restProps } = props;
  return (
    <InputContainer className={className}>
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <TextInput {...restProps} />
    </InputContainer>
  );
}

Input.propTypes = {
  icon: PropTypes.any,
  className: PropTypes.string,
};

export default Input;
