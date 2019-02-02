import { inject, observer } from "mobx-react";
import moment, { Moment } from "moment";
import { stringify } from "query-string";
import React from "react";
import DocumentTitle from "react-document-title";

import { Box, Button, Col, Grid, Loader, Row, Text } from "../../components";
import RootStore from "../../store";

import DateRangePicker from "./components/DateRangePicker";
import Table from "./components/Table";

interface Props {
    history: any;
    rootStore: RootStore;
}

class BudgetsClass extends React.Component<Props> {
    public componentWillMount() {
        const {
            rootStore: {
                budgetsStore: { budgets, getBudgets }
            }
        } = this.props;
        if (budgets.length) {
            return;
        }
        getBudgets();
    }

    public render() {
        const {
            rootStore: {
                budgetsStore: {
                    budgets,
                    startDate,
                    endDate,
                    isLoading,
                    totalBudgeted,
                    totalSpent
                }
            }
        } = this.props;
        const total = {
            name: "Total",
            budgeted: totalBudgeted,
            spent: totalSpent
        };
        return (
            <DocumentTitle title="Budgets | Wilbur">
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
                                    noMargin={true}
                                    size={Text.Size.Xxl}
                                >
                                    Budgets
                                </Text>
                                <Box
                                    alignItems={Box.AlignItems.Center}
                                    display={Box.Display.Flex}
                                >
                                    <Box mr={2}>
                                        <DateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            handleDatesChange={
                                                this.handleDatesChange
                                            }
                                            handleClose={this.handleClose}
                                        />
                                    </Box>
                                    <Box>
                                        <Button
                                            color={Button.Color.Secondary}
                                            noWrap={true}
                                            to="/budgets/new"
                                        >
                                            Create Budget
                                        </Button>
                                    </Box>
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
                                <Box mb={4}>
                                    <Table budgets={budgets} total={total} />
                                </Box>
                            </Col>
                        </Row>
                    )}
                </Grid>
            </DocumentTitle>
        );
    }

    private handleDatesChange = (
        startDate: Moment | null,
        endDate: Moment | null
    ) => {
        const {
            rootStore: {
                budgetsStore: { setStartDate, setEndDate }
            }
        } = this.props;
        setStartDate(startDate);
        setEndDate(endDate);
    };

    private handleClose = (startDate: Moment, endDate: Moment | null) => {
        const {
            rootStore: {
                budgetsStore: { setStartDate, setEndDate, getBudgets }
            }
        } = this.props;

        const dateOne = startDate && moment(startDate);
        const dateTwo = !endDate ? dateOne : moment(endDate);
        setStartDate(dateOne);
        setEndDate(dateTwo);

        const queryParams = {
            start_date: dateOne.format("YYYY-MM-DD"),
            end_date: dateTwo.isSame(dateOne)
                ? undefined
                : dateTwo.format("YYYY-MM-DD")
        };
        this.props.history.push({
            pathname: "/budgets",
            search: stringify(queryParams)
        });
        getBudgets();
    };
}

export const Budgets = inject("rootStore")(observer(BudgetsClass));
