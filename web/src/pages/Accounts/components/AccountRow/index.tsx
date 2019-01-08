import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Box, Text, Button } from "../../../../components";

interface Props {
    color: string;
    id: string;
    institution: string;
    last: boolean;
    mask: string;
    name: string;
    networkActive: boolean;
    publicToken: string;
    type: string;
    handleDelete: Function;
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

    render() {
        const {
            color,
            institution,
            last,
            mask,
            name,
            networkActive,
            type
        } = this.props;
        const { startDelete } = this.state;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                display={Box.Display.Flex}
                bb={!last}
                borderColor={Box.BorderColor.Gray9}
                justifyContent={Box.JustifyContent.SpaceBetween}
                p={3}
            >
                <Box
                    alignItems={Box.AlignItems.FlexStart}
                    display={Box.Display.Flex}
                >
                    <Box
                        cornerRadius={Box.CornerRadius.Circle}
                        backgroundColor={Box.BackgroundColor.Gold3}
                        css={`
                            background-color: #${color};
                            height: 2.5rem;
                            min-width: 2.5rem;
                        `}
                        mr={2}
                    />
                    <Box>
                        <Box mb={0.15}>
                            <Text color={Text.Color.Gray4} size={Text.Size.Xs}>
                                {institution} -{" "}
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
        );
    }
}
