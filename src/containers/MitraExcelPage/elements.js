import styled from 'styled-components';

export const XLPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const XLPageHeaderContainer = styled.div`
  display: flex;
  padding-bottom: 30px;
  /* background: rgba(211, 211, 211, 0.6); */
`;

export const XLPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  background: rgba(211, 211, 211, 0.6);
  padding: 35px 15px;
  margin-top:50px;
`;

export const InformationContainerHeading = styled.div`
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: 10px;
  margin-top: -15px;
  margin-left: 30px;
  @media screen and (max-width: 32em) {
    font-size: 1rem;
  }
`;


export const Buttton = styled.button`
  background-color: rgb(114,49,12);
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px 0px;
  marigin-top: 20px;
  cursor: pointer;
`;
