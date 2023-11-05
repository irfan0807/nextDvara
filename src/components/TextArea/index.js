import React from 'react';
import { TextAreaWrapper, TextAreaInput } from './elements';

function TextArea(props) {
  return (
    <TextAreaWrapper>
      <TextAreaInput {...props} />
    </TextAreaWrapper>
  );
}

export default TextArea;
