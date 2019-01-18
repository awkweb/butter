import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import moment from "moment";
import { get } from "../../lib/get";
import { Box, Col, Text, Grid, Row, Button, Loader } from "../../components";
import RootStore from "../../store";
import TransactionRow from "./components/TransactionRow";
import Header from "./components/Header";

interface Props {
    rootStore: RootStore;
}

class TransactionsClass extends React.Component<Props> {
    componentWillMount() {
        const {
            rootStore: {
                transactionsStore: { transactions, getTransactions }
            }
        } = this.props;
        if (transactions.length) {
            return;
        }
        getTransactions();
    }

    formatDate = (date: string): string => {
        const dateMoment = moment(date);
        const todayMoment = moment();
        const showYear =
            dateMoment.year() !== todayMoment.year() ? ", YYYY" : "";
        return dateMoment.format(`MMM D${showYear}`);
    };

    render() {
        const {
            rootStore: {
                transactionsStore: {
                    allSelected,
                    anySelected,
                    isLoading,
                    selectedTransactionIds,
                    transactions,
                    deleteTransactions,
                    handleSelectAll,
                    selectTransaction
                }
            }
        } = this.props;
        return (
            <DocumentTitle title="Transactions | Wilbur">
                <Grid maxWidth="md" ph={{ xs: 2, md: 12 }}>
                    <Row>
                        <Col xs={12}>
                            <Box
                                alignItems={Box.AlignItems.Center}
                                display={Box.Display.Flex}
                                justifyContent={Box.JustifyContent.SpaceBetween}
                                mb={4}
                                mt={12}
                            >
                                <Text
                                    el={Text.Element.H1}
                                    font={Text.Font.Title}
                                    noMargin
                                    size={Text.Size.Xxl}
                                >
                                    Transactions
                                </Text>
                                <Box>
                                    <Button
                                        color={Button.Color.Secondary}
                                        to="/transactions/new"
                                    >
                                        Create Transaction
                                    </Button>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                    {isLoading && (
                        <Row>
                            <Col xs={12}>
                                <Box mt={2}>
                                    <Loader />
                                </Box>
                            </Col>
                        </Row>
                    )}
                    {!isLoading && (
                        <Row>
                            <Col xs={12}>
                                {transactions.length > 0 && (
                                    <Box>
                                        <Header
                                            allSelected={allSelected}
                                            anySelected={anySelected}
                                            handleOnChange={handleSelectAll}
                                            handleDelete={deleteTransactions}
                                        />
                                        <Box
                                            backgroundColor={
                                                Box.BackgroundColor.White
                                            }
                                            mb={4}
                                        >
                                            {transactions.map(transaction => (
                                                <TransactionRow
                                                    amountCents={
                                                        transaction.amountCents
                                                    }
                                                    accountMask={get(
                                                        () =>
                                                            transaction.account
                                                                .mask
                                                    )}
                                                    accountName={get(
                                                        () =>
                                                            transaction.account
                                                                .name
                                                    )}
                                                    budgetName={get(
                                                        () =>
                                                            transaction.budget
                                                                .name
                                                    )}
                                                    checked={selectedTransactionIds.includes(
                                                        transaction.id
                                                    )}
                                                    date={this.formatDate(
                                                        transaction.date
                                                    )}
                                                    key={transaction.id}
                                                    id={transaction.id}
                                                    name={transaction.name}
                                                    transaction={transaction}
                                                    handleChange={
                                                        selectTransaction
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                                {transactions.length === 0 && (
                                    <Box
                                        b
                                        borderColor={Box.BorderColor.Gray9}
                                        backgroundColor={
                                            Box.BackgroundColor.White
                                        }
                                        cornerRadius={Box.CornerRadius.Small}
                                        p={3}
                                        textAlign={Box.TextAlign.Center}
                                    >
                                        <Text size={Text.Size.Sm}>
                                            Create a transaction and you'll see
                                            it right here.
                                        </Text>
                                    </Box>
                                )}
                            </Col>
                        </Row>
                    )}
                </Grid>
            </DocumentTitle>
        );
    }
}

export const Transactions = inject("rootStore")(observer(TransactionsClass));
