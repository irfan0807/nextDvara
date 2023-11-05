import styled from 'styled-components';

export const PortalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalWrapper = styled.div`
  background-color: #f8f8f8;
  border-radius: 5px;
  position: relative;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  > h2 {
    font-size: bold;
    font-size: 18px;
    margin: 0;
    margin-right: 30px;
  }
`;

export const StyledCross = styled.button`
  cursor: pointer;
  margin: 10px 10px 10px auto;
  opacity: 0.7;
  width: 30px;
  height: 30px;
  background: #dbdbdb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;
