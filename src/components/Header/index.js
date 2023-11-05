import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {
    HeaderContainer,
    HeaderWrapper,
    DvaraLogoImgWrapper,
    DvaraLogoImg,
    // DvaraEDairyTittle,
    HeaderCustomTitle,
    HeaderCustomTitleWrapper,
    LogoutContainer,
    LogoutButton,
} from './elements';
import DvaraLogo from '../../images/dvara.jpg';

const Header = ({ height, width, title, url, logout, mr }) => {

    const handleLogout = () => {

        firebase
            .auth()
            .signOut()
            .then(() => {
                window.localStorage.removeItem('type');
                window.location = '/login';
            });

    }

    return (

        <HeaderContainer>
            <HeaderWrapper exact="true" to={url || '/'}>
                <DvaraLogoImgWrapper height={height} width={width}>
                    <DvaraLogoImg src={DvaraLogo} alt={DvaraLogo} />
                </DvaraLogoImgWrapper>
            </HeaderWrapper>
            {/* <DvaraEDairyTittle>eDairy</DvaraEDairyTittle> */}
            {title ? (
                <HeaderCustomTitleWrapper mr={mr}>
                    <HeaderCustomTitle>{title}</HeaderCustomTitle>
                </HeaderCustomTitleWrapper>
            ) : (
                ''
            )}
            {logout ? (
                <LogoutContainer onClick={handleLogout}>
                    {/* <Logout /> */}
                    <LogoutButton>Logout</LogoutButton>
                </LogoutContainer>
            ) : (
                ''
            )}
        </HeaderContainer>



    )
}
Header.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    logout: PropTypes.bool,
    mr: PropTypes.string,
};

export default Header
