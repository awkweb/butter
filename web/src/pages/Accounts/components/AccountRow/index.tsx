import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import {
    Box,
    Text,
    Button,
    PlaidLink,
    InstitutionLogo
} from "../../../../components";
import { cssFactory } from "../../../../components/utils/styled-components";
import { css } from "styled-components";

interface Props {
    expired: boolean;
    id: string;
    institutionId: string;
    institutionName: string;
    linkLoaded: boolean;
    mask: string;
    name: string;
    networkActive: boolean;
    publicToken: string;
    type: string;
    handleDelete: Function;
    handleRenewLink: Function;
}

export default class AccountRow extends React.Component<Props> {
    static defaultProps = { last: false };

    state = { startDelete: false };

    onOutsideClick = () => {
        this.setState({ startDelete: false });
    };

    onClickDelete = () => {
        if (this.state.startDelete) {
            const { id, handleDelete } = this.props;
            handleDelete(id);
        } else {
            this.setState({ startDelete: true });
        }
    };

    onSuccess = () => {
        const { id, handleRenewLink } = this.props;
        handleRenewLink(id);
    };

    render() {
        const {
            expired,
            institutionId,
            institutionName,
            linkLoaded,
            mask,
            name,
            networkActive,
            publicToken,
            type
        } = this.props;
        const { startDelete } = this.state;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                bb
                borderColor={Box.BorderColor.Gray9}
                display={Box.Display.Flex}
                justifyContent={Box.JustifyContent.SpaceBetween}
                p={3}
            >
                <Box
                    alignItems={Box.AlignItems.Center}
                    display={Box.Display.Flex}
                >
                    <InstitutionLogo id={institutionId} />
                    <Box>
                        <Box mb={0.15}>
                            <Text color={Text.Color.Gray4} size={Text.Size.Xs}>
                                {institutionName} -{" "}
                                <Text
                                    color={Text.Color.Gray4}
                                    el={Text.Element.Span}
                                    size={Text.Size.Xs}
                                    transform={Text.Transform.Capitalize}
                                >
                                    {type}
                                </Text>
                            </Text>
                        </Box>
                        <Text color={Text.Color.Gray1} size={Text.Size.Sm}>
                            {name} - {mask}
                        </Text>
                    </Box>
                </Box>
                <Box
                    alignItems={Box.AlignItems.Center}
                    display={Box.Display.Flex}
                >
                    {linkLoaded && expired && (
                        <Box css={genActionCSS()} mr={3}>
                            <PlaidLink
                                noBackground
                                noBorder
                                token={publicToken}
                                onSuccess={this.onSuccess}
                            >
                                <Text
                                    color={Text.Color.Blue2}
                                    size={Text.Size.Xs}
                                    weight={Text.Weight.Medium}
                                >
                                    Renew Link
                                </Text>
                            </PlaidLink>
                        </Box>
                    )}
                    <Box css={genActionCSS()}>
                        <OutsideClickHandler
                            disabled={!startDelete}
                            onOutsideClick={this.onOutsideClick}
                        >
                            <Button
                                color={Button.Color.Primary}
                                disabled={networkActive}
                                isLoading={startDelete && networkActive}
                                noBackground
                                noBorder
                                onClick={this.onClickDelete}
                            >
                                {startDelete ? "Really delete?" : "Delete"}
                            </Button>
                        </OutsideClickHandler>
                    </Box>
                </Box>
            </Box>
        );
    }
}

const genActionCSS = () =>
    cssFactory(css)`
        button {
            padding: 0;
        }
    `;
