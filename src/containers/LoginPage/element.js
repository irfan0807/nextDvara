import styled from 'styled-components';
import UserLogin from 'icons/UserLogin';
import Button from 'components/Button';

export const LoginPageContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background: rgba(211, 211, 211, 0.6); */
`;

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  background: rgba(211, 211, 211, 0.2);
  width: 100%;
`;

export const LoginPageWrapper = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  transition: box-shadow 0.15s ease;
  background: rgba(211, 211, 211, 0.6);
  padding: 1rem 0.3rem;
  box-shadow: 0 2px 2px rgba(50, 50, 93, 0.15), 0 2px 0 rgba(0, 0, 0, 0.02);
  @media screen and (max-width: 32em) {
    width: 90%;
  }
`;

export const LoginIconContainer = styled(UserLogin)`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  height: 6rem;
  width: 6rem;
`;

export const LoginTitle = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  text-transform: uppercase;
  /* color: #878987; */
`;

export const LoginInputContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin: 1rem;
`;

export const LogInButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const LogInButton = styled(Button)`
  height: 30px;
  background: #5ae3a4;
`;

export const LoginErrorMsg = styled.div`
  height: 30px;
  width: 30%;
  margin: 10px;
  border-radius: 3px;
  padding-top: 3px;
  text-align: center;
  color: #ffffff;
  background: red;
  @media screen and (max-width: 32em) {
    width: 90%;
  }
`;
