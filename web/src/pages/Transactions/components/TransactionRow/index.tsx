import React from "react";
import { toJS } from "mobx";
import { Box, Text, Link } from "../../../../components";
import { toAmount } from "../../../../utils";
import { BooleanField } from "../../../../components/core/components/form/BooleanField";
import { Transaction } from "../../../../types/transaction";

interface Props {
    amountCents: number;
    accountName?: number;
    accountMask?: number;
    budgetName?: string;
    date: string;
    id: string;
    last: boolean;
    name: string;
    transaction?: Transaction;
}

export default class TransactionRow extends React.Component<Props> {
    state = {
        checked: false
    };

    onChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        const {
            accountMask,
            accountName,
            amountCents,
            id,
            last,
            name,
            transaction
        } = this.props;
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
                <Box display={Box.Display.Flex}>
                    <Box mr={2} pt={0.35}>
                        <BooleanField
                            id={`transactions-${id}`}
                            checked={checked}
                            onChange={this.onChange}
                        />
                    </Box>
                    <Box>
                        <Link
                            color={Link.Color.Gray1}
                            size={Link.Size.Sm}
                            to={{
                                pathname: `/transactions/${id}`,
                                state: { transaction: toJS(transaction) }
                            }}
                        >
                            {name}
                        </Link>
                        {accountMask && accountName && (
                            <Text color={Text.Color.Gray4} size={Text.Size.Xxs}>
                                {accountName} - {accountMask}
                            </Text>
                        )}
                    </Box>
                </Box>
                <Text size={Text.Size.Md}>${toAmount(amountCents)}</Text>
            </Box>
        );
    }
}
