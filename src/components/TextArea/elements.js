import styled from 'styled-components';

export const TextAreaWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const TextAreaInput = styled.textarea`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 3px;
  border-radius: 2px;
  background: ${props => (props.bgColor ? props.bgColor : 'rgb(255,255,255)')};
  padding: 4px;
  ::placeholder {
    opacity: 0.4;
  }
`;
