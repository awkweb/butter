import { inject, observer } from "mobx-react";
import React from "react";
import DocumentTitle from "react-document-title";
import OutsideClickHandler from "react-outside-click-handler";

import {
    Box,
    Button,
    Col,
    DateField,
    Field,
    Grid,
    Link,
    Row,
    SelectField,
    Text
} from "../../components";
import { get } from "../../lib/get";
import RootStore from "../../store";

interface Props {
    location: any;
    match: any;
    history: any;
    rootStore: RootStore;
}

class TransactionClass extends React.Component<Props> {
    public async componentWillMount() {
        const {
            history,
            match: {
                params: { id }
            },
            location: { state },
            rootStore: {
                transactionFormStore: {
                    initForm,
                    getBudgets,
                    getTransaction,
                    setId
                },
                transactionsStore: { transactions, getTransactions }
            }
        } = this.props;
        setId(id);
        getBudgets();
        if (id !== "new") {
            const transaction = get(() => state.transaction);
            if (transaction) {
                initForm(
                    transaction.amountCents,
                    transaction.budget,
                    transaction.date,
                    transaction.description,
                    transaction.name
                );
            } else {
                try {
                    await getTransaction();
                } catch (e) {
                    history.replace("/transactions");
                }
            }
        }
        if (!transactions.length) {
            getTransactions();
        }
    }

    public componentWillUnmount() {
        this.props.rootStore.transactionFormStore.reset();
    }

    public onChangeName = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setName(e.target.value);
    };

    public onChangeAmount = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setAmount(e.target.value);
    };

    public onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setDescription(
            e.target.value
        );
    };

    public onChangeDateFocused = ({ focused }: { focused: boolean | null }) => {
        this.props.rootStore.transactionFormStore.setDateFocused(!!focused);
    };

    public onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {
            history,
            rootStore: {
                transactionFormStore: {
                    isUpdatable,
                    handleUpdate,
                    handleCreate
                }
            }
        } = this.props;
        if (isUpdatable) {
            handleUpdate();
            history.push("/transactions");
        } else {
            await handleCreate();
            history.push("/transactions");
        }
    };

    public onOutsideClick = () => {
        this.props.rootStore.transactionFormStore.handleOutsideClick();
    };

    public onClickDelete = async () => {
        const {
            history,
            rootStore: {
                transactionFormStore: { handleDelete, startDelete }
            }
        } = this.props;
        await handleDelete();
        if (startDelete) {
            history.push("/transactions");
        }
    };

    public render() {
        const {
            rootStore: {
                transactionFormStore: {
                    name,
                    amount,
                    budget,
                    budgets,
                    date,
                    dateFocused,
                    description,
                    error,
                    isUpdatable,
                    isFormDisabled,
                    isLoading,
                    isDeleting,
                    networkActive,
                    startDelete,
                    amountError,
                    budgetError,
                    dateError,
                    nameError,
                    setBudget,
                    setDate
                }
            }
        } = this.props;
        const title = `${isUpdatable ? "Update" : "Create"} Transaction`;
        return (
            <DocumentTitle title={`${title} | Wilbur`}>
                <Grid maxWidth="md" ph={{ xs: 2, md: 10 }}>
                    <Row>
                        <Col xs={12}>
                            <Box
                                alignItems={Box.AlignItems.Center}
                                css={`
                                    height: 2.3125rem;
                                `}
                                display={Box.Display.Flex}
                                mb={4}
                                mt={12}
                            >
                                <Text
                                    el={Text.Element.H1}
                                    font={Text.Font.Title}
                                    noMargin={true}
                                    size={Text.Size.Xxl}
                                >
                                    {title}
                                </Text>
                            </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Box
                                display={Box.Display.Flex}
                                el={Box.Element.Form}
                                flexDirection={Box.FlexDirection.Column}
                                onSubmit={this.onSubmit}
                            >
                                <Box mb={2}>
                                    <Field
                                        autofocus={true}
                                        error={nameError}
                                        id="Name"
                                        label="Name"
                                        value={name}
                                        onChange={this.onChangeName}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <Field
                                        error={amountError}
                                        id="amount"
                                        label="Amount"
                                        type={Field.Type.Number}
                                        value={amount || ""}
                                        onChange={this.onChangeAmount}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <DateField
                                        error={dateError}
                                        focused={dateFocused}
                                        value={date}
                                        onChange={setDate}
                                        onFocusChange={this.onChangeDateFocused}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <SelectField
                                        error={budgetError}
                                        id="budget"
                                        options={budgets.map(b => ({
                                            value: b.id,
                                            label: b.name
                                        }))}
                                        placeholder="Budget"
                                        value={budget}
                                        onChange={setBudget}
                                    />
                                </Box>

                                <Box mb={4}>
                                    <Field
                                        id="description"
                                        label="Description"
                                        type={Field.Type.Textarea}
                                        value={description}
                                        onChange={this.onChangeDescription}
                                    />
                                </Box>

                                <Box
                                    display={Box.Display.Flex}
                                    justifyContent={
                                        Box.JustifyContent.SpaceBetween
                                    }
                                >
                                    <Box display={Box.Display.Flex}>
                                        <Button
                                            color={Button.Color.Brand}
                                            disabled={isFormDisabled}
                                            isLoading={isLoading}
                                            size={Button.Size.Lg}
                                            type="submit"
                                        >
                                            {isUpdatable ? "Update" : "Create"}
                                        </Button>
                                        <Box
                                            alignItems={Box.AlignItems.Center}
                                            display={Box.Display.Flex}
                                            ml={3}
                                        >
                                            <Link
                                                color={Link.Color.Gray5}
                                                disabled={networkActive}
                                                weight={Link.Weight.Medium}
                                                to="/transactions"
                                            >
                                                Cancel
                                            </Link>
                                        </Box>
                                    </Box>

                                    {isUpdatable && (
                                        <OutsideClickHandler
                                            onOutsideClick={this.onOutsideClick}
                                        >
                                            <Button
                                                color={Button.Color.Error}
                                                disabled={networkActive}
                                                isLoading={isDeleting}
                                                noBackground={true}
                                                size={Button.Size.Lg}
                                                onClick={this.onClickDelete}
                                            >
                                                {startDelete
                                                    ? "Really delete?"
                                                    : "Delete"}
                                            </Button>
                                        </OutsideClickHandler>
                                    )}
                                </Box>

                                {!!error && (
                                    <Box mt={3}>
                                        <Text color={Text.Color.Red3}>
                                            {error}
                                        </Text>
                                    </Box>
                                )}
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const Transaction = inject("rootStore")(observer(TransactionClass));
