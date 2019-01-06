import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row, Loader, PlaidLink } from "../../components";
import RootStore from "../../store";
import { Item } from "../../types/item";
import AccountRow from "./components/AccountRow";

interface Props {
    rootStore: RootStore;
}

class AccountsClass extends React.Component<Props> {
    state = {
        plaidPublicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
        plaidEnv: process.env.REACT_APP_PLAID_ENV
    };

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

    onSuccess = (token: string, data: Item) => {
        const { account, institution } = data;
        console.log(token, account, institution);
        this.props.rootStore.itemsStore.createItem({
            institution,
            account: {
                ...account,
                account_id: account.id,
                id: undefined
            },
            public_token: token
        });
    };

    render() {
        const {
            rootStore: {
                itemsStore: { items, isLoading }
            }
        } = this.props;
        const { plaidPublicKey, plaidEnv } = this.state;
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
                                    <PlaidLink
                                        env={plaidEnv}
                                        clientName="Wilbur"
                                        publicKey={plaidPublicKey}
                                        onSuccess={this.onSuccess}
                                    >
                                        Add Account
                                    </PlaidLink>
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
                                {items.length > 0 && (
                                    <Box
                                        b
                                        borderColor={Box.BorderColor.Gray9}
                                        backgroundColor={
                                            Box.BackgroundColor.White
                                        }
                                        cornerRadius={Box.CornerRadius.Small}
                                    >
                                        {items.map((item, index) => (
                                            <AccountRow
                                                color={item.institution.color}
                                                key={item.id}
                                                institution={
                                                    item.institution.name
                                                }
                                                mask={item.account.mask}
                                                name={item.account.name}
                                                last={
                                                    index === items.length - 1
                                                }
                                                type={item.account.subtype}
                                            />
                                        ))}
                                    </Box>
                                )}
                                {items.length === 0 && (
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
