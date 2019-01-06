import React from "react";
import { Box, Text } from "../../../../components";

interface Props {
    color: string;
    institution: string;
    last: boolean;
    mask: string;
    name: string;
    type: string;
}

export default class AccountRow extends React.Component<Props> {
    static defaultProps = { last: false };

    render() {
        const { color, institution, last, mask, name, type } = this.props;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                display={Box.Display.Flex}
                bb={!last}
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
                            width: 2.5rem;
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
                <Box>
                    <Text color={Text.Color.Blue3} size={Text.Size.Xs}>
                        Update
                    </Text>
                </Box>
            </Box>
        );
    }
}
