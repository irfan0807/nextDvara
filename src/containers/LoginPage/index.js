import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import axios from 'axios';
import reducer from './reducer';
import saga from './saga';
import Input from '../../components/Input';
import UserIcon from '../../icons/UserIcon';
import Password from '../../icons/Password';
import {
    LoginPageContainer,
    LoginPageWrapper,
    LoginIconContainer,
    LoginTitle,
    LoginInputContainer,
    LogInButton,
    LogInButtonContainer,
    LoginErrorMsg,
    LoginPageContainerWrapper,
} from './elements';
import makeSelectLoginPage from './selectors';
import { updateInputField, checkCredentials } from '../App/actions';
import { selectLoginErrorMsg, selectLoginLoading } from '../App/selectors';
import Header from '../../components/Header';

const LoginPage = ({
    onUpdateInputField,
    onCheckCredentials,
    errorMsg,
    loading,
}) => {
    useEffect(() => {
        axios
            .get(
                `https://api.ipdata.co/?api-key=b2040ca6234d09eb39377cdf66603e5302cc1a956087771f583bbef9`,
            )
            .then(res => {
                const ipaddress = { ipaddr: res.data.ip };
                axios
                    .post('http://34.105.16.205:4940/visitingrecords', ipaddress)
                    .then(response => console.log(response));
            });
    }, []);

    const handleOnChange = (e) => {
        onUpdateInputField({
            name: e.target.name,
            value: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onCheckCredentials();
    };

    return (
        <LoginPageContainerWrapper>
            <Header url="/login" title="Dvara Edairy" mr="120px" />
            <LoginPageContainer>
                <LoginPageWrapper>
                    <LoginIconContainer />
                    <LoginTitle>sign in with credentials</LoginTitle>
                    <LoginInputContainer onSubmit={handleOnSubmit}>
                        <Input
                            name="username"
                            type="text"
                            placeholder="Enter User Name"
                            icon={<UserIcon />}
                            autoComplete="off"
                            required
                            onChange={handleOnChange}
                        />
                        <Input
                            name="mobile"
                            type="email"
                            placeholder="Enter Email ID"
                            icon={<UserIcon />}
                            autoComplete="off"
                            required
                            onChange={handleOnChange}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            icon={<Password />}
                            onChange={handleOnChange}
                            required
                        />
                        <LogInButtonContainer>
                            <LogInButton type="submit" loading={loading}>
                                Submit
                            </LogInButton>
                        </LogInButtonContainer>
                    </LoginInputContainer>
                </LoginPageWrapper>
                {errorMsg ? <LoginErrorMsg>{errorMsg}</LoginErrorMsg> : ''}
            </LoginPageContainer>
        </LoginPageContainerWrapper>
    );
};

LoginPage.propTypes = {
    onUpdateInputField: PropTypes.func,
    onCheckCredentials: PropTypes.func,
    errorMsg: PropTypes.string,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    loginPage: makeSelectLoginPage(),
    errorMsg: selectLoginErrorMsg(),
    loading: selectLoginLoading(),
});

function mapDispatchToProps(dispatch) {
    return {
        onUpdateInputField: (data) => dispatch(updateInputField(data)),
        onCheckCredentials: () => dispatch(checkCredentials()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LoginPage);
