import React from "react";
import styled from "styled-components";
import { Box } from "../../../../components";
import { Transaction } from "../../../../types/transaction";
import TableRow from "../TableRow";
import { get } from "../../../../lib/get";
import moment from "moment";

interface Props {
    transactions: Array<Transaction>;
    selectedTransactionIds: Array<string>;
    selectTransaction: Function;
}

export default class Table extends React.Component<Props> {
    formatDate = (date: string): string => {
        const dateMoment = moment(date);
        const todayMoment = moment();
        const showYear =
            dateMoment.year() !== todayMoment.year() ? ", YYYY" : "";
        return dateMoment.format(`MMM D${showYear}`);
    };

    render() {
        const {
            transactions,
            selectedTransactionIds,
            selectTransaction
        } = this.props;
        return (
            <Box
                backgroundColor={Box.BackgroundColor.White}
                cornerRadius={Box.CornerRadius.Small}
                css={`
                    overflow-x: scroll;
                `}
            >
                <StyledTable>
                    <tbody>
                        {transactions.map(transaction => (
                            <TableRow
                                amountCents={transaction.amountCents}
                                accountMask={get(
                                    () => transaction.account.mask
                                )}
                                accountName={get(
                                    () => transaction.account.name
                                )}
                                budgetName={get(() => transaction.budget.name)}
                                checked={selectedTransactionIds.includes(
                                    transaction.id
                                )}
                                date={this.formatDate(transaction.date)}
                                key={transaction.id}
                                id={transaction.id}
                                name={transaction.name}
                                transaction={transaction}
                                handleChange={selectTransaction}
                            />
                        ))}
                    </tbody>
                </StyledTable>
            </Box>
        );
    }
}

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
`;
