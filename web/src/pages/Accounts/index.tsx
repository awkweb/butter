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
    state = { linkLoaded: false };

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

    onLoad = () => {
        this.setState({ linkLoaded: true });
    };

    onSuccess = (token: string, data: Item) => {
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

    handleDelete = (id: string) => {
        this.props.rootStore.itemsStore.deleteItem(id);
    };

    handleRenewLink = (id: string) => {
        this.props.rootStore.itemsStore.renewLink(id);
    };

    render() {
        const {
            rootStore: {
                itemsStore: { items, isDeleting, isLoading }
            }
        } = this.props;
        const { linkLoaded } = this.state;
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
                                        bt
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
                                                handleDelete={this.handleDelete}
                                                handleRenewLink={
                                                    this.handleRenewLink
                                                }
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
