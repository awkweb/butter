import React from "react";
import styled, { css } from "styled-components";
import { Box, Text } from "../../../../components";
import { range } from "lodash";
import { cssFactory } from "../../../../components/utils/styled-components";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    page: number;
    pagesCount: number;
}

export default class TablePagination extends React.Component<Props> {
    getPageNumberButtons = () => {
        const { page, pagesCount } = this.props;
        return range(1, pagesCount + 1).map(i => {
            const active = page === i;
            const elProps = {
                active: active || undefined,
                key: i
            };
            if (active) {
                return <StyledBlock {...elProps}>{i}</StyledBlock>;
            } else {
                return (
                    <StyledLink
                        {...elProps}
                        to={{
                            pathname: "/transactions",
                            search: `?page=${i}`
                        }}
                    >{`${i}`}</StyledLink>
                );
            }
        });
    };

    getNextButton = () => {
        const { page, pagesCount } = this.props;
        return page === pagesCount ? (
            <StyledBlock>Next</StyledBlock>
        ) : (
            <StyledLink
                to={{
                    pathname: "/transactions",
                    search: `?page=${page + 1}`
                }}
            >
                Next
            </StyledLink>
        );
    };

    getPreviousButton = () => {
        const { page } = this.props;
        return page === 1 ? (
            <StyledBlock>Previous</StyledBlock>
        ) : (
            <StyledLink
                to={{
                    pathname: "/transactions",
                    search: `?page=${page - 1}`
                }}
            >
                Previous
            </StyledLink>
        );
    };

    render() {
        return (
            <Box
                display={Box.Display.Flex}
                justifyContent={Box.JustifyContent.Center}
            >
                {this.getPreviousButton()}
                {this.getPageNumberButtons()}
                {this.getNextButton()}
            </Box>
        );
    }
}

const commonStyles = cssFactory(css)`
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.gray9};
    color: ${props => props.theme.colors.blue3};
    cursor: pointer;
    font-size: ${props => props.theme.text.getSize(Text.Size.Xs)};
    font-weight: ${props => props.theme.text.getWeight(Text.Weight.SemiBold)};
    margin-left: -1px;
    outline: none;
    padding: 7px 12px;
    position: relative;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:first-child {
        border-bottom-left-radius: ${props => props.theme.cornerRadii.small};
        border-top-left-radius: ${props => props.theme.cornerRadii.small};
    }

    &:last-child {
        border-bottom-right-radius: ${props => props.theme.cornerRadii.small};
        border-top-right-radius: ${props => props.theme.cornerRadii.small};
    }
`;

interface InternalProps {
    active?: boolean;
}

const styledBlockStyles = cssFactory<InternalProps>(css)`
    ${commonStyles};
    ${props =>
        props.active &&
        `
        border: 1px solid ${props.theme.colors.blue3};
        z-index: 3;
    `}
    ${props => !props.active && `cursor: default;`}
    background: ${props =>
        props.active ? props.theme.colors.blue3 : "#fafbfc"};
    color: ${props => (props.active ? props.theme.colors.white : "#d1d5da")};
`;

const StyledBlock = styled.span`
    ${styledBlockStyles}
`;

const styledLinkStyles = cssFactory<InternalProps>(css)`
    ${commonStyles};
    &:hover {
        background-color: #eff3f6;
        border-color: #e1e4e8;
        z-index: 2;
    }
`;

const StyledLink = styled(RouterLink)`
    ${styledLinkStyles};
`;
