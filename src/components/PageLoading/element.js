import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    margin-top: 20%;
  }
  to{
    margin-top: -20%;
  }
`;

const rotate1 = keyframes`
  from {
    margin-top:-20%;
  }
  to{
    margin-top: 20%;
  }
`;

export const PageLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  margin: 1px;
`;

export const PageLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageLoadingElementWrapper = styled.div`
  animation: ${rotate1} 1s ease infinite alternate;
`;

export const PageLoadingElementWrapperAlt = styled.div`
  animation: ${rotate} 1s ease infinite alternate;
`;

export const PageLoadingElement = styled.div`
  border-radius: 50%;
  margin: 5px;
  height: 15px;
  width: 15px;
  opacity: 0.78;
  background: ${props => (props.bg ? props.bg : `red`)};
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
`;
