import React from 'react';
import PropTypes from 'prop-types';

import { CheckBoxWrapper, Input, Label, CheckBoxButton } from './elements';

function CheckBox(props) {
    const { value, label, disabled, ...restProps } = props;
    return (
        <CheckBoxWrapper isDisabled={disabled}>
            <Input
                type="checkbox"
                name="option"
                value={value || label}
                disabled={disabled}
                {...restProps}
            />
            <CheckBoxButton isDisabled={disabled} />
            <Label>{label}</Label>
        </CheckBoxWrapper>
    );
}

CheckBox.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
};

export default CheckBox;
