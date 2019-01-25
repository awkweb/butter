import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row, Button, Loader } from "../../components";
import RootStore from "../../store";
import Table from "./components/Table";
import TableHeader from "./components/TableHeader";

interface Props {
    rootStore: RootStore;
}

class TransactionsClass extends React.Component<Props> {
    componentWillMount() {
        const {
            rootStore: {
                transactionsStore: { transactions, getBudgets, getTransactions }
            }
        } = this.props;
        if (transactions.length) {
            return;
        }
        getBudgets();
        getTransactions();
    }

    render() {
        const {
            rootStore: {
                transactionsStore: {
                    budgets,
                    allSelected,
                    anySelected,
                    isLoading,
                    selectedTransactionIds,
                    transactions,
                    startDelete,
                    deleteTransactions,
                    handleCategorize,
                    handleSelectAll,
                    getTransactions,
                    selectTransaction,
                    handleOutsideClick
                }
            }
        } = this.props;
        return (
            <DocumentTitle title="Transactions | Wilbur">
                <Grid maxWidth="md" ph={{ xs: 2, md: 10 }}>
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
                                    size={Text.Size.Xl}
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
                                    <React.Fragment>
                                        <TableHeader
                                            budgets={budgets}
                                            allSelected={allSelected}
                                            anySelected={anySelected}
                                            startDelete={startDelete}
                                            handleOnChange={handleSelectAll}
                                            handleCategorize={handleCategorize}
                                            handleDelete={deleteTransactions}
                                            handleFilter={getTransactions}
                                            handleOutsideClick={
                                                handleOutsideClick
                                            }
                                        />
                                        <Table
                                            transactions={transactions}
                                            selectedTransactionIds={
                                                selectedTransactionIds
                                            }
                                            selectTransaction={
                                                selectTransaction
                                            }
                                        />
                                    </React.Fragment>
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
