import React from "react";
import { Box, Text, Link } from "../../../../components";
import { toAmount } from "../../../../utils";
import { BooleanField } from "../../../../components/core/components/form/BooleanField";

interface Props {
    id: string;
    name: string;
    last: boolean;
    date: string;
    amountCents: number;
    budget: string;
}

export default class TransactionRow extends React.Component<Props> {
    state = {
        checked: false
    };

    onChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        const { id, last, date, name, amountCents, budget } = this.props;
        const { checked } = this.state;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                display={Box.Display.Flex}
                bb={!last}
                borderColor={Box.BorderColor.Gray9}
                justifyContent={Box.JustifyContent.SpaceBetween}
                p={2}
            >
                <BooleanField
                    id="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                />
                <Link to={`transactions/${id}`}>
                    <Text size={Text.Size.Xs}>
                        {date} {name} ${toAmount(amountCents)}
                        {budget}
                    </Text>
                </Link>
            </Box>
        );
    }
}
