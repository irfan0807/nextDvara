import styled, { css } from 'styled-components';

export const CheckBoxWrapper = styled.label`
  display: flex;
  margin: 5px 15px 10px 0px;
  display: block;
  position: relative;
  cursor: pointer;
  font-weight: 600;
  margin-right: 20px;
  user-select: none;
  font-size: 12px;
  ${({ isDisabled }) =>
        !isDisabled
            ? css`
          ${Label}:hover {
            color: #3399ff;
            font-weight: 600;
            opacity: 1;
          }
        `
            : ''};
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const CheckBoxButton = styled.span`
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #fffaff;
  border-radius: 2px;
  border: 2px solid #3399ff;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.4' : '1')};

  &::after {
    display: none;
    margin-left: 3px;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    content: '';
    transform: rotate(45deg);
  }

  ${Input}:checked ~ & {
    background-color: #3399ff;
    &::after {
      display: block;
    }
  }
`;
export const Label = styled.span`
  opacity: 0.7;
  display: block;
  margin-top: -1px;
  text-align: right;
  margin-left: 20px;
`;
