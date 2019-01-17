import React from "react";
import { Box, Text } from "../../../../components";
import { prettyNumber } from "../../../../lib/currency";

interface Props {
    name: string;
    value: number;
    last: boolean;
}

export default class SummaryStat extends React.Component<Props> {
    static defaultProps = {
        last: false
    };

    render() {
        const { name, value, last } = this.props;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                display={Box.Display.Flex}
                br={!last}
                borderColor={Box.BorderColor.Gray8}
                flexDirection={Box.FlexDirection.Column}
                fluidWidth
                ph={3}
                pb={3}
                pt={3.5}
            >
                <Box>
                    <Text
                        color={value < 0 ? Text.Color.Red2 : Text.Color.Gray1}
                        size={Text.Size.Lg}
                    >
                        {prettyNumber(value)}
                    </Text>
                </Box>
                <Box mt={0.5}>
                    <Text color={Text.Color.Gray3} size={Text.Size.Sm}>
                        {name}
                    </Text>
                </Box>
            </Box>
        );
    }
}
