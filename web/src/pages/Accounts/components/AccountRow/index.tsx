import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { css } from "styled-components";

import {
    Box,
    Button,
    InstitutionLogo,
    PlaidLink,
    Text
} from "../../../../components";
import { cssFactory } from "../../../../components/utils/styled-components";

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
    handleDelete: (id: string) => void;
    handleRenewLink: (id: string) => void;
}

export default class AccountRow extends React.Component<Props> {
    public state = { startDelete: false };

    public render() {
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
                bb={true}
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
                            <Text color={Text.Color.Gray4} size={Text.Size.Sm}>
                                {institutionName} -{" "}
                                <Text
                                    color={Text.Color.Gray4}
                                    el={Text.Element.Span}
                                    size={Text.Size.Sm}
                                    transform={Text.Transform.Capitalize}
                                >
                                    {type}
                                </Text>
                            </Text>
                        </Box>
                        <Text color={Text.Color.Gray1}>
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
                                noBackground={true}
                                noBorder={true}
                                token={publicToken}
                                onSuccess={this.onSuccess}
                            >
                                <Text
                                    color={Text.Color.Blue2}
                                    size={Text.Size.Sm}
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
                                noBackground={true}
                                noBorder={true}
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

    private onOutsideClick = () => {
        this.setState({ startDelete: false });
    };

    private onClickDelete = () => {
        if (this.state.startDelete) {
            const { id, handleDelete } = this.props;
            handleDelete(id);
        } else {
            this.setState({ startDelete: true });
        }
    };

    private onSuccess = () => {
        const { id, handleRenewLink } = this.props;
        handleRenewLink(id);
    };
}

const genActionCSS = () =>
    cssFactory(css)`
        button {
            padding: 0;
        }
    `;
