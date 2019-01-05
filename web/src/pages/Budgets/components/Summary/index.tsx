import React from "react";
import { Box } from "../../../../components";
import SummaryStat from "../SummaryStat";

interface Props {
    budgeted: number;
    remaining: number;
    spent: number;
}

export default class Summary extends React.Component<Props> {
    render() {
        const { budgeted, remaining, spent } = this.props;
        return (
            <Box
                b
                borderColor={Box.BorderColor.Gray8}
                cornerRadius={Box.CornerRadius.Small}
                display={Box.Display.Flex}
            >
                <SummaryStat name="Remaining" value={remaining} />
                <SummaryStat name="Spent" value={spent} />
                <SummaryStat name="Budgeted" last value={budgeted} />
            </Box>
        );
    }
}
