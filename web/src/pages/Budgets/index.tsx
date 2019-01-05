import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row, Button, Loader } from "../../components";
import RootStore from "../../store";
import Summary from "./components/Summary";
import Table from "./components/Table";

interface Props {
    rootStore: RootStore;
}

class BudgetsClass extends React.Component<Props> {
    componentWillMount() {
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

    render() {
        const {
            rootStore: {
                budgetsStore: {
                    budgets,
                    isLoading,
                    totalBudgeted,
                    totalRemaining,
                    totalSpent
                }
            }
        } = this.props;
        return (
            <DocumentTitle title="Budgets | Wilbur">
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
                                    Budgets
                                </Text>
                                <Box>
                                    <Button
                                        color={Button.Color.Secondary}
                                        to="/budgets/new"
                                    >
                                        Create Budget
                                    </Button>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Box mb={2}>
                                <Summary
                                    budgeted={totalBudgeted}
                                    remaining={totalRemaining}
                                    spent={totalSpent}
                                />
                            </Box>
                        </Col>
                    </Row>
                    <Row>
                        {isLoading && (
                            <Col xs={12}>
                                <Box mt={2}>
                                    <Loader />
                                </Box>
                            </Col>
                        )}
                    </Row>
                    {!isLoading && (
                        <Row>
                            <Col xs={12}>
                                {budgets.length > 0 && (
                                    <Table budgets={budgets} />
                                )}
                                {budgets.length === 0 && (
                                    <Box
                                        b
                                        borderColor={Box.BorderColor.Gray9}
                                        backgroundColor={
                                            Box.BackgroundColor.Gray10
                                        }
                                        cornerRadius={Box.CornerRadius.Small}
                                        p={3}
                                        textAlign={Box.TextAlign.Center}
                                    >
                                        <Text size={Text.Size.Sm}>
                                            Create a budget and you'll see them
                                            right here.
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

export const Budgets = inject("rootStore")(observer(BudgetsClass));
