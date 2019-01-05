import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row, Button, Loader } from "../../components";
import RootStore from "../../store";
interface Props {
    rootStore: RootStore;
}

class AccountsClass extends React.Component<Props> {
    componentWillMount() {
        const {
            rootStore: {
                itemsStore: { items, getItems }
            }
        } = this.props;
        if (items.length) {
            return;
        }
        getItems();
    }

    render() {
        const {
            rootStore: {
                itemsStore: { items, isLoading }
            }
        } = this.props;
        console.log(items);
        return (
            <DocumentTitle title="Connected Accounts | Wilbur">
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
                                    Connected Accounts
                                </Text>
                                <Box>
                                    <Button
                                        color={Button.Color.Secondary}
                                        to="/budgets/new"
                                    >
                                        Add Account
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
                                {items.length > 0 && <Box>Merp</Box>}
                                {items.length === 0 && (
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
                                            Link an account and you'll see it
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

export const Accounts = inject("rootStore")(observer(AccountsClass));
