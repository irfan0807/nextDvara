/**
 *
 * PageLoading
 *
 */

import React from 'react';
import {
    PageLoadingContainer,
    PageLoadingWrapper,
    PageLoadingElement,
    PageLoadingElementWrapper,
    PageLoadingElementWrapperAlt,
} from './elements';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PageLoading() {
    return (
        <PageLoadingContainer>
            <PageLoadingWrapper>
                <PageLoadingElementWrapper>
                    <PageLoadingElement bg="#4390FB" />
                </PageLoadingElementWrapper>
                <PageLoadingElementWrapperAlt>
                    <PageLoadingElement bg="#F3392D" />
                </PageLoadingElementWrapperAlt>

                <PageLoadingElementWrapper>
                    <PageLoadingElement bg="#1B8D06" />
                </PageLoadingElementWrapper>
                <PageLoadingElementWrapperAlt>
                    <PageLoadingElement bg="#06458D" />
                </PageLoadingElementWrapperAlt>
                <PageLoadingElementWrapper>
                    <PageLoadingElement />
                </PageLoadingElementWrapper>
            </PageLoadingWrapper>
        </PageLoadingContainer>
    );
}

PageLoading.propTypes = {};

export default PageLoading;
