import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 4%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgb(192, 192, 192));
  border-right: 1px solid linear-gradient(rgba(0, 0, 0, 0.5), rgb(192, 192, 192));
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 1s ease 0.15;
  border-top-right-radius: 3px;
  margin-top:80px;
  min-height:100vh;
`;

export const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  margin-top: 10px;
  border-radius: 5px;
  padding: 7px 8px;
  position: relative;
  text-decoration: none;
  color: #000;
  &:hover {
    &::before {
      white-space: nowrap;
      content: '';
      position: absolute;
      margin-left: 45px;
      padding: 5px 10px;
      color: rgba(0, 0, 0, 0.8);
      background: white;
      margin-top: -2px;
      border-radius: 3px;
      box-shadow: 0 -2px 14px 0 rgba(0, 0, 0, 0.07);
      font-size: 14px;
      font-weight: 600;
      display: block;
    }
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  }
  &.active {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StyledNavLinkNormal = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  padding: 6px 4px;
  position: relative;
  text-decoration: none;
  color: #000;
  &:hover {
    &::before {
      white-space: nowrap;
      content: '';
      position: absolute;
      margin-left: 45px;
      padding: 5px 10px;
      color: rgba(0, 0, 0, 0.8);
      background: white;
      margin-top: -2px;
      border-radius: 3px;
      box-shadow: 0 -2px 14px 0 rgba(0, 0, 0, 0.07);
      font-size: 14px;
      font-weight: 600;
      display: block;
    }
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  }
  &.active {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  }
`;

const MonoColorLink = styled(StyledNavLink)`
  &.active,
  &:hover {
    color: #fff;
  }
`;

const MonoColorLinkNormal = styled(StyledNavLinkNormal)`
  &.active,
  &:hover {
    color: #fff;
  }
`;

export const DashBoardLink = styled(MonoColorLink)`
  color: #fff;
  &.active,
  &:hover {
    background: linear-gradient(#a2c614, #9ab827);
  }
  &:hover {
    &::before {
      content: 'Dashboard';
    }
  }
`;

export const DocumentLink = styled(MonoColorLink)`
  color: #fff;
  &.active,
  &:hover {
    background: linear-gradient(#a2c614, #9ab827);
  }
  &:hover {
    padding: 6px;
    &::before {
      content: 'Cattle Management Material';
      background: #fff;
      z-index: 999;
    }
  }
`;

export const DocumentLinkPDF = styled(MonoColorLink)`
  color: #fff;
  &.active,
  &:hover {
    background: linear-gradient(#a2c614, #9ab827);
  }
  &:hover {
    padding: 6px;
    &::before {
      content: 'Summer Management Of Dairy Cows';
      background: #fff;
      z-index: 999;
    }
  }
`;

export const EditLink = styled(MonoColorLinkNormal)`
  color: #fff;
  &:hover {
    background: linear-gradient(#a2c614, #9ab827);
  }
  &:hover {
    &::before {
      content: 'Cattle Management Material';
      background: #fff;
      z-index: 999;
    }
  }
`;
