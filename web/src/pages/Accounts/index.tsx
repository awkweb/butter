import { inject, observer } from "mobx-react";
import React from "react";
import Helmet from "react-helmet";

import { Box, Col, Grid, Loader, PlaidLink, Row, Text } from "../../components";
import RootStore from "../../store";
import { Item } from "../../types/item";

import AccountRow from "./components/AccountRow";

interface Props {
    rootStore: RootStore;
}

class AccountsClass extends React.Component<Props> {
    public state = { linkLoaded: false };

    public componentWillMount() {
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

    public render() {
        const {
            rootStore: {
                itemsStore: {
                    items,
                    isDeleting,
                    isLoading,
                    deleteItem,
                    renewLink
                }
            }
        } = this.props;
        const { linkLoaded } = this.state;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Connected Accounts</title>
                </Helmet>
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
                                    Connected Accounts
                                </Text>
                                <Box>
                                    <PlaidLink
                                        onLoad={this.onLoad}
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
                                        bt={true}
                                        borderColor={Box.BorderColor.Gray9}
                                        backgroundColor={
                                            Box.BackgroundColor.White
                                        }
                                        mb={4}
                                    >
                                        {items.map(item => (
                                            <AccountRow
                                                expired={item.expired}
                                                key={item.id}
                                                id={item.id}
                                                institutionId={
                                                    item.institution
                                                        .institutionId
                                                }
                                                institutionName={
                                                    item.institution.name
                                                }
                                                linkLoaded={linkLoaded}
                                                mask={item.account.mask}
                                                name={item.account.name}
                                                networkActive={isDeleting}
                                                publicToken={item.publicToken}
                                                type={item.account.subtype}
                                                handleDelete={deleteItem}
                                                handleRenewLink={renewLink}
                                            />
                                        ))}
                                    </Box>
                                )}
                                {items.length === 0 && (
                                    <Box
                                        bb={true}
                                        bt={true}
                                        borderColor={Box.BorderColor.Gray9}
                                        backgroundColor={
                                            Box.BackgroundColor.White
                                        }
                                        p={4}
                                        textAlign={Box.TextAlign.Center}
                                    >
                                        <Text>No accounts</Text>
                                    </Box>
                                )}
                            </Col>
                        </Row>
                    )}
                </Grid>
            </React.Fragment>
        );
    }

    private onLoad = () => {
        this.setState({ linkLoaded: true });
    };

    private onSuccess = (token: string, data: Item) => {
        const { account, institution } = data;
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
}

export const Accounts = inject("rootStore")(observer(AccountsClass));
