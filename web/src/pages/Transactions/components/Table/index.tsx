import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../../components";
import { Transaction } from "../../../../types/transaction";
import TableRow from "../TableRow";
import { get } from "../../../../lib/get";
import moment from "moment";
import TablePagination from "../TablePagination";

interface Props {
    transactions: Array<Transaction>;
    page: number;
    pagesCount: number;
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
            page,
            pagesCount,
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
                        {transactions.length === 0 && (
                            <Box
                                bb
                                bt
                                borderColor={Box.BorderColor.Gray7}
                                p={2}
                            >
                                <Text
                                    align={Text.Align.Center}
                                    weight={Text.Weight.Medium}
                                >
                                    No transactions
                                </Text>
                            </Box>
                        )}
                    </tbody>
                </StyledTable>
                {pagesCount > 1 && (
                    <Box mb={4} mt={3}>
                        <TablePagination page={page} pagesCount={pagesCount} />
                    </Box>
                )}
            </Box>
        );
    }
}

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
`;
