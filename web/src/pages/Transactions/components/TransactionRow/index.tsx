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
            name,
            transaction
        } = this.props;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                bb
                borderColor={Box.BorderColor.Gray9}
                display={Box.Display.Flex}
                justifyContent={Box.JustifyContent.SpaceBetween}
                p={2}
            >
                <Box
                    alignItems={Box.AlignItems.Center}
                    css={`
                        width: 45%;
                    `}
                    display={Box.Display.Flex}
                >
                    <Box mr={2.5}>
                        <BooleanField
                            id={`transactions-${id}`}
                            checked={checked}
                            onChange={this.onChange}
                        />
                    </Box>
                    <Box>
                        <Link
                            to={{
                                pathname: `/transactions/${id}`,
                                state: { transaction: toJS(transaction) }
                            }}
                        >
                            <Text
                                color={Link.Color.Blue2}
                                whiteSpace={Text.WhiteSpace.NoWrap}
                                weight={Link.Weight.Medium}
                            >
                                {name}
                            </Text>
                        </Link>
                        <Text
                            color={Text.Color.Gray3}
                            size={Text.Size.Xs}
                            whiteSpace={Text.WhiteSpace.NoWrap}
                        >
                            {date}{" "}
                            {accountMask &&
                                accountName &&
                                `∙ ${accountName} - ${accountMask}`}
                        </Text>
                    </Box>
                </Box>
                {budgetName && (
                    <Box
                        b
                        borderColor={Box.BorderColor.Gold4}
                        cornerRadius={Box.CornerRadius.Round}
                        ph={1}
                        pv={0.5}
                    >
                        <Text
                            align={Text.Align.Center}
                            color={Text.Color.Gold1}
                            size={Text.Size.Xs}
                            weight={Text.Weight.Medium}
                        >
                            {budgetName}
                        </Text>
                    </Box>
                )}
                <Box
                    alignItems={Box.AlignItems.Center}
                    display={Box.Display.Flex}
                >
                    <Text color={Text.Color.Gray2} size={Text.Size.Lg}>
                        {prettyNumber(amountCents)}
                    </Text>
                </Box>
            </Box>
        );
    }
}
