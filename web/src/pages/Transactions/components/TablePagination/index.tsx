import React from "react";
import { range } from "lodash";
import styled, { css } from "styled-components";
import { Box, Text } from "../../../../components";
import { cssFactory } from "../../../../components/utils/styled-components";
import { Link as RouterLink } from "react-router-dom";
import { parse, stringify } from "query-string";

interface Props {
    page: number;
    pagesCount: number;
}

export default class TablePagination extends React.Component<Props> {
    private getQueryStringForPageNumber = (page: number): string => {
        const queryParams = {
            ...parse(location.search),
            page
        };
        return stringify(queryParams);
    };

    private first = () => {
        const { page } = this.props;
        const active = page === 1;
        const elProps = {
            active: active || undefined,
            key: 1
        };
        return (
            <React.Fragment>
                <StyledLink
                    {...elProps}
                    to={{
                        pathname: "/transactions",
                        search: this.getQueryStringForPageNumber(1)
                    }}
                >
                    1
                </StyledLink>
                <StyledBlock>...</StyledBlock>
            </React.Fragment>
        );
    };

    private last = () => {
        const { page, pagesCount } = this.props;
        const active = page === pagesCount;
        const elProps = {
            active: active || undefined,
            key: pagesCount
        };
        return (
            <React.Fragment>
                <StyledBlock>...</StyledBlock>
                <StyledLink
                    {...elProps}
                    to={{
                        pathname: "/transactions",
                        search: this.getQueryStringForPageNumber(pagesCount)
                    }}
                >
                    {`${pagesCount}`}
                </StyledLink>
            </React.Fragment>
        );
    };

    private add = (s: number, f: number) => {
        const { page } = this.props;
        return range(s, f).map(i => {
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
                            search: this.getQueryStringForPageNumber(i)
                        }}
                    >{`${i}`}</StyledLink>
                );
            }
        });
    };

    getPageNumberButtons = () => {
        const { page, pagesCount } = this.props;
        const size = pagesCount;
        const step = 2; // pages before and after current

        if (size < step * 2 + 6) {
            return this.add(1, size + 1);
        } else if (page < step * 2 + 1) {
            return (
                <React.Fragment>
                    {this.add(1, step * 2 + 4)}
                    {this.last()}
                </React.Fragment>
            );
        } else if (page > size - step * 2) {
            return (
                <React.Fragment>
                    {this.first()}
                    {this.add(size - step * 2 - 2, size + 1)}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {this.first()}
                    {this.add(page - step, page + step + 1)}
                    {this.last()}
                </React.Fragment>
            );
        }
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
