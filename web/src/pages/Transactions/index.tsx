import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row, Button, Loader } from "../../components";
import RootStore from "../../store";
import Table from "./components/Table";
import TableHeader from "./components/TableHeader";
import { get } from "../../lib/get";
import { parse, stringify } from "query-string";

interface Props {
    history: any;
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

    componentDidUpdate() {
        const {
            rootStore: {
                transactionsStore: {
                    budgetFilter: currentBudget,
                    page: currentPage,
                    getTransactions
                }
            }
        } = this.props;

        const queryParams = parse(location.search);
        const page = parseInt(get(() => queryParams.page, "1"));
        const pageChanged = page !== currentPage;
        const budget = get(() => queryParams.budget, "all");
        const budgetChanged = budget !== currentBudget;

        if (pageChanged || budgetChanged) {
            getTransactions();
        }
    }

    setBudgetFilter = (budget: string) => {
        const queryParams = {
            budget: budget === "all" ? undefined : budget,
            page: 1
        };
        this.props.history.push({
            pathname: "/transactions",
            search: stringify(queryParams)
        });
    };

    render() {
        const {
            rootStore: {
                transactionsStore: {
                    budgets,
                    budgetFilter,
                    allSelected,
                    anySelected,
                    isLoading,
                    selectedTransactionIds,
                    transactions,
                    page,
                    pagesCount,
                    startDelete,
                    deleteTransactions,
                    handleCategorize,
                    handleSelectAll,
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
                                        noWrap
                                        to="/transactions/new"
                                    >
                                        Create Transaction
                                    </Button>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TableHeader
                                budgets={budgets}
                                budgetFilter={budgetFilter}
                                allSelected={allSelected}
                                anySelected={anySelected}
                                startDelete={startDelete}
                                handleOnChange={handleSelectAll}
                                handleCategorize={handleCategorize}
                                handleDelete={deleteTransactions}
                                handleFilter={this.setBudgetFilter}
                                handleOutsideClick={handleOutsideClick}
                            />
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <Table
                                    transactions={transactions}
                                    page={page}
                                    pagesCount={pagesCount}
                                    selectedTransactionIds={
                                        selectedTransactionIds
                                    }
                                    selectTransaction={selectTransaction}
                                />
                            )}
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const Transactions = inject("rootStore")(observer(TransactionsClass));
