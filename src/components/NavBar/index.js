import React from 'react';
import PropTypes from 'prop-types';
import {
    NavBarContainer,
    DashBoardLink,
    NavBarWrapper,
    // EditLink,
    DocumentLink,
    DocumentLinkPDF,
} from './elements';
import Dashboard from '../../icons/Dashboard';
import Book from '../../icons/Book';
import PDF from '../../icons/PDF';

export default function NavBar(props) {
    const { url } = props;
    return (
        <NavBarContainer {...props}>
            <NavBarWrapper>
                <DashBoardLink exact to={url} activeClassName="active">
                    <Dashboard height={25} width={25} />
                </DashBoardLink>
                <DocumentLink
                    exact
                    to="/docs/1"
                    target="_blank"
                    activeClassName="active"
                >
                    <Book height={30} width={30} />
                </DocumentLink>
                <DocumentLinkPDF
                    exact
                    to="/docs/2"
                    target="_blank"
                    activeClassName="active"
                >
                    <PDF height={30} width={30} />
                </DocumentLinkPDF>
            </NavBarWrapper>
        </NavBarContainer>
    );
}

NavBar.propTypes = {
    url: PropTypes.string,
};
