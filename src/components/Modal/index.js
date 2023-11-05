import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CrossIcon from 'icons/Cross';
import { Portal } from './Portal';
import { ModalWrapper, HeaderWrapper, StyledCross } from './elements';

const Modal = ({
    trigger,
    children,
    onModalToggle,
    modalTitle,
    showCloseButton,
    closeOnEscPress,
    closeOnOutsideClick,
    isOpen: initialIsOpen,
}) => {
    const [isOpen, setIsOpen] = useState(initialIsOpen || false);

    const modalTarget = useRef(null);

    // Add onClick to the trigger node
    const Trigger = trigger
        ? React.cloneElement(trigger, {
            onClick: () => handleToggleModal(),
        })
        : null;

    const handleToggleModal = () => {
        if (onModalToggle) {
            onModalToggle();
        }
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleCloseModal = () => {
        if (closeOnOutsideClick) {
            setIsOpen(false);
        }
    };

    const handleEscKeyPress = (event) => {
        if (closeOnEscPress && event.keyCode === 27) {
            setIsOpen(false);
        }
    };

    return (
        <React.Fragment>
            {Trigger}
            {isOpen && (
                <Portal
                    target={modalTarget.current}
                    onClosePortal={handleCloseModal}
                >
                    <ModalWrapper innerRef={modalTarget}>
                        <HeaderWrapper>
                            {modalTitle && <h2>{modalTitle}</h2>}
                            {showCloseButton && (
                                <StyledCross onClick={handleToggleModal}>
                                    <CrossIcon width={12} height={12} />
                                </StyledCross>
                            )}
                        </HeaderWrapper>
                        {children}
                    </ModalWrapper>
                </Portal>
            )}
        </React.Fragment>
    );
};

Modal.defaultProps = {
    showCloseButton: true,
    closeOnEscPress: true,
    closeOnOutsideClick: true,
};

Modal.propTypes = {
    trigger: PropTypes.node,
    children: PropTypes.node,
    onModalToggle: PropTypes.func,
    modalTitle: PropTypes.string,
    showCloseButton: PropTypes.bool,
    closeOnEscPress: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    isOpen: PropTypes.bool,
};

export default Modal;
