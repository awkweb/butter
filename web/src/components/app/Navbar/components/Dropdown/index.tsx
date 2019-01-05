import * as React from "react";
import { Button, Text, Link } from "../../../../index";
import styled, { css } from "styled-components";
import { cssFactory } from "../../../../core/utils/styled-components";
import { style } from "../../../../core/utils/css";

interface Props {
    open: boolean;
    handleLogOut: Function;
}

export default class Dropdown extends React.Component<Props> {
    onClickLogOut = () => {
        this.props.handleLogOut();
    };

    render() {
        return (
            <StyledDropdown {...this.props}>
                <StyledDropdownItem>
                    <Link
                        color={Text.Color.Gray2}
                        size={Text.Size.Xs}
                        to="/accounts"
                    >
                        Connected Accounts
                    </Link>
                </StyledDropdownItem>
                <StyledDropdownItem>
                    <Button noBackground noBorder onClick={this.onClickLogOut}>
                        <Text
                            align={Text.Align.Left}
                            color={Text.Color.Gray2}
                            size={Text.Size.Xs}
                        >
                            Log Out
                        </Text>
                    </Button>
                </StyledDropdownItem>
            </StyledDropdown>
        );
    }
}

const StyledDropdownItem = styled.li`
    border-bottom: 1px solid ${props => props.theme.colors.gray7};
    &:hover {
        background-color: ${props => props.theme.colors.gray10};
    }
    &:first-child {
        border-top-right-radius: ${props => props.theme.cornerRadii.small};
        border-top-left-radius: ${props => props.theme.cornerRadii.small};
    }
    &:last-child {
        border-bottom: 0;
        border-bottom-right-radius: ${props => props.theme.cornerRadii.small};
        border-bottom-left-radius: ${props => props.theme.cornerRadii.small};
    }
    a {
        display: block;
        box-sizing: border-box;
    }
    a,
    button {
        padding: 1.25rem;
        width: 100%;
    }
`;

const commonStyles = cssFactory<Props>(css)`
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.gray7};
    border-radius: ${props => props.theme.cornerRadii.small};
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25);
    list-style-type: none;
    margin: 0;
    ${props => style("opacity", props.open ? 1 : 0)};
    padding: 0;
    ${props => style("pointerEvents", props.open ? "all" : "none")};
    position: absolute;
    right: 0;
    ${props => style("top", props.open ? "3.5rem" : "2rem")};
    transition: all 0.2s cubic-bezier(0.7, 0, 0.175, 1) 0s;
    width: 16rem;
    z-index: ${props => props.theme.zIndex.Z_INDEX_HIGHEST};
`;

const StyledDropdown = styled.ul`
    ${commonStyles};
`;
