import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #b7c8da;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1;
  position: fixed;
  background-color: #a2c617;
  color: white;
  z-index: 99999999;
`;

export const HeaderWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 10px;
  /* border-right: 1px solid #b7c8da; */
  text-decoration: none;
  cursor: pointer;
`;

// export const HeaderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: stretch;
//   width: 100%;
//   height: 100px;
//   border-bottom: 1px solid #b7c8da;
//   box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
//   transform: box-shadow 0.15s ease 0.1;
//   background-color: #a2c617;
// `;

// export const HeaderWrapper = styled(Link)`
//   display: flex;
//   justify-content: center;
//   margin: 10px;
//   /* border-right: 1px solid #b7c8da; */
//   text-decoration: none;
//   cursor: pointer;
// `;

export const DvaraLogoImgWrapper = styled.div`
  display: flex;
  margin: 0px 5px;
  width: ${props => (props.width ? props.width : '100px')};
  height: ${props => (props.height ? props.height : '60px')};
`;

export const DvaraLogoImg = styled.img`
  margin: 0 auto;
  height: inherit;
  width: inherit;
  border: 1px solid #b7c8da;
  border-radius: 3px;
`;

export const DvaraEDairyTittle = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  color: #72310c;
`;

export const HeaderCustomTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-right: ${props => (props.mr ? props.mr : 0)};
`;

export const HeaderCustomTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.4rem;
  color:#72310c;
`;

export const LogoutContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  margin-right: 15px;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
background: rgb(114, 49, 12);
color: white;
font-size:0.9rem;
cursor: pointer;
padding:8px;
border-radius:5px;
`
