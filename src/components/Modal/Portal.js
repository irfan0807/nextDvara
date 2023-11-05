import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PortalWrapper } from './elements';

const Portal = ({ children, onClosePortal, target, closeOnOutsideClick, closeOnEscPress }) => {
    const handleEscapeKeyPress = (evt) => {
        if (evt.keyCode === 27 && closeOnEscPress) {
            if (onClosePortal) {
                onClosePortal();
            }
        }
    };

    const handleOutSideClick = (evt) => {
        if (closeOnOutsideClick) {
            const modalTarget = target;
            if (modalTarget && !modalTarget.current.contains(evt.target)) {
                if (onClosePortal) {
                    onClosePortal();
                }
            }
        }
    };

    useEffect(() => {
        if (closeOnOutsideClick) {
            document.addEventListener('click', handleOutSideClick);
        }
        if (closeOnEscPress) {
            document.addEventListener('keyup', handleEscapeKeyPress);
        }

        return () => {
            document.removeEventListener('keyup', handleEscapeKeyPress);
            document.removeEventListener('click', handleOutSideClick);
        };
    }, [closeOnOutsideClick, closeOnEscPress]);

    return <PortalWrapper>{children}</PortalWrapper>;
};

Portal.defaultProps = {
    closeOnOutsideClick: true,
    closeOnEscPress: true,
};

Portal.propTypes = {
    children: PropTypes.node,
    onClosePortal: PropTypes.func.isRequired,
    target: PropTypes.object,
    closeOnOutsideClick: PropTypes.bool,
    closeOnEscPress: PropTypes.bool,
};

export default Portal;
