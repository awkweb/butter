import React from "react";
import { toJS } from "mobx";
import { Box, Text, Link } from "../../../../components";
import { prettyNumber } from "../../../../lib/currency";
import { BooleanField } from "../../../../components/core/components/form/BooleanField";
import { Transaction } from "../../../../types/transaction";

interface Props {
    amountCents: number;
    accountName?: number;
    accountMask?: number;
    budgetName?: string;
    checked: boolean;
    date: string;
    id: string;
    last: boolean;
    name: string;
    transaction?: Transaction;
    handleChange: Function;
}

export default class TransactionRow extends React.Component<Props> {
    onChange = () => {
        const { id, handleChange } = this.props;
        handleChange(id);
    };

    render() {
        const {
            accountMask,
            accountName,
            amountCents,
            budgetName,
            checked,
            date,
            id,
            last,
            name,
            transaction
        } = this.props;
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
                    <Box mr={2.5} pt={0.35}>
                        <BooleanField
                            id={`transactions-${id}`}
                            checked={checked}
                            onChange={this.onChange}
                        />
                    </Box>
                    <Box>
                        <Link
                            color={Link.Color.Blue2}
                            size={Link.Size.Sm}
                            to={{
                                pathname: `/transactions/${id}`,
                                state: { transaction: toJS(transaction) }
                            }}
                            weight={Link.Weight.SemiBold}
                        >
                            {name}
                        </Link>
                        <Text color={Text.Color.Gray4} size={Text.Size.Xxs}>
                            {date}{" "}
                            {accountMask &&
                                accountName &&
                                `∙ ${accountName} - ${accountMask}`}
                        </Text>
                    </Box>
                </Box>
                <Box
                    alignItems={Box.AlignItems.Center}
                    display={Box.Display.Flex}
                >
                    {budgetName && (
                        <Box
                            backgroundColor={Box.BackgroundColor.Gray10}
                            cornerRadius={Box.CornerRadius.Small}
                            mr={2}
                            ph={0.75}
                            pv={0.25}
                        >
                            <Text color={Text.Color.Gray1} size={Text.Size.Xxs}>
                                {budgetName}
                            </Text>
                        </Box>
                    )}
                    <Text size={Text.Size.Sm}>{prettyNumber(amountCents)}</Text>
                </Box>
            </Box>
        );
    }
}
