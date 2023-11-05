/**
 *
 * Button
 *
 */

// import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  background: ${props => (props.BgColor ? props.BgColor : '#3399ff')};
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  outline: none;
  cursor: pointer;
  padding: 5px 20px;
  position: relative;
  &:hover {
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  }
  ${({ block }) =>
        block
            ? css`
          width: 100%;
        `
            : ''};
  ${({ disabled }) =>
        disabled &&
        css`
      cursor: auto;
      opacity: 0.5;
      &:hover {
        box-shadow: none;
        opacity: 0.5;
      }
    `};
  ${({ loading }) =>
        loading
            ? css`
          opacity: 0.7;
          color: transparent !important;
          background: #d8d8d8 !important;
          &:hover {
            opacity: 0.7;
            box-shadow: none;
          }
          cursor: default;
          &::after {
            animation-iteration-count: infinite;
            border-radius: 500rem;
            border-color: #fff transparent transparent;
            border-style: solid;
            border-width: 0.2em;
            animation: ${rotate360} 0.6s linear infinite;
          }
          &::before,
          &::after {
            position: absolute;
            content: '';
            top: 50%;
            left: 50%;
            margin: -0.64285714em 0 0 -0.64285714em;
            width: 1.28571429em;
            height: 1.28571429em;
          }
        ` // eslint-disable-line indent
            : ''};
  ${({ Selected }) =>
        Selected
            ? css`
          border: 3px solid #09b9fb;
          /* margin: 1px; */
        `
            : ''};
`;

export default Button;
