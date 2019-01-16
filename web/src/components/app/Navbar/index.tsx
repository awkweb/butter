import * as React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Box, CaretDown, Col, Grid, Icon, Link, Row, Text } from "../../index";
import { cssFactory } from "../../core/utils/styled-components";
import { css } from "styled-components";
import Dropdown from "./components/Dropdown";

interface Props {
    location: any;
    userInitial: string;
    handleLogOut: Function;
}

export class Navbar extends React.Component<Props> {
    state = { isDropdownOpen: false };

    getLinkProps = (path: string) => {
        const {
            location: { pathname }
        } = this.props;
        const active = path === pathname;
        return {
            color: active ? Text.Color.Gray1 : Text.Color.Gray5,
            weight: active ? Text.Weight.SemiBold : Text.Weight.Normal
        };
    };

    onOutsideClick = () => {
        this.setState({ isDropdownOpen: false });
    };

    onClickDropdown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    };

    render() {
        const { userInitial, handleLogOut } = this.props;
        const { isDropdownOpen } = this.state;
        return (
            <Box
                backgroundColor={Box.BackgroundColor.White}
                bb
                borderColor={Box.BorderColor.Gray9}
                css={genNavbarOuterCSS()}
                el={Box.Element.Nav}
                position={Box.Position.Fixed}
            >
                <Grid maxWidth="md" ph={{ xs: 2, md: 12 }}>
                    <Row>
                        <Col bottomPadding={false} fluidHeight xs={12}>
                            <Box
                                alignItems={Box.AlignItems.Center}
                                css={genNavbarInnerCSS()}
                                display={Box.Display.Flex}
                                justifyContent={Box.JustifyContent.SpaceBetween}
                            >
                                <Box
                                    alignItems={Box.AlignItems.Baseline}
                                    display={Box.Display.Flex}
                                    pt={0.5}
                                >
                                    <Box>
                                        <Link to="/budgets">
                                            <Text
                                                {...this.getLinkProps(
                                                    "/budgets"
                                                )}
                                                size={Text.Size.Xs}
                                            >
                                                Budgets
                                            </Text>
                                        </Link>
                                    </Box>
                                    <Box ml={3}>
                                        <Link to="/transactions">
                                            <Text
                                                {...this.getLinkProps(
                                                    "/transactions"
                                                )}
                                                size={Text.Size.Xs}
                                            >
                                                Transactions
                                            </Text>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box
                                    alignItems={Box.AlignItems.Center}
                                    display={Box.Display.Flex}
                                    position={Box.Position.Relative}
                                >
                                    <OutsideClickHandler
                                        disabled={!isDropdownOpen}
                                        onOutsideClick={this.onOutsideClick}
                                    >
                                        <Box
                                            alignItems={Box.AlignItems.Center}
                                            display={Box.Display.Flex}
                                            pt={0.5}
                                            onClick={this.onClickDropdown}
                                        >
                                            <Box
                                                alignItems={
                                                    Box.AlignItems.Center
                                                }
                                                display={Box.Display.Flex}
                                                b
                                                backgroundColor={
                                                    Box.BackgroundColor.Gold4
                                                }
                                                borderColor={
                                                    Box.BorderColor.Gold1
                                                }
                                                cornerRadius={
                                                    Box.CornerRadius.Circle
                                                }
                                                justifyContent={
                                                    Box.JustifyContent.Center
                                                }
                                                css={genAvatarCSS()}
                                            >
                                                <Text
                                                    color={Text.Color.White}
                                                    el={Text.Element.Span}
                                                    size={Text.Size.Sm}
                                                    transform={
                                                        Text.Transform.Uppercase
                                                    }
                                                    weight={Text.Weight.Bold}
                                                >
                                                    {userInitial}
                                                </Text>
                                            </Box>
                                            <Box css={genChevronDownCSS()}>
                                                <CaretDown
                                                    color={Icon.Color.Gray6}
                                                    size={Icon.Size.Xxs}
                                                />
                                            </Box>
                                        </Box>
                                    </OutsideClickHandler>
                                    <Dropdown
                                        open={isDropdownOpen}
                                        handleLogOut={handleLogOut}
                                    />
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </Box>
        );
    }
}

const genNavbarOuterCSS = () =>
    cssFactory(css)`
        left: 0;
        right: 0;
        top: 0
        z-index: ${props => props.theme.zIndex.Z_INDEX_HIGHEST};
    `;

const genNavbarInnerCSS = () =>
    cssFactory(css)`
        height: 3.5rem;
    `;

const genAvatarCSS = () =>
    cssFactory(css)`
        height: 2rem;
        width: 2rem;
    `;

const genChevronDownCSS = () =>
    cssFactory(css)`
        svg {
            margin-left: 0.3rem;
            margin-top: 0.3rem;
        }
    `;
