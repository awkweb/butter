import React from "react";
import { inject, observer } from "mobx-react";
import { Moment } from "moment";
import DocumentTitle from "react-document-title";
import OutsideClickHandler from "react-outside-click-handler";
import {
    Box,
    Col,
    Text,
    Grid,
    Row,
    Field,
    Button,
    Link,
    DateField,
    SelectField
} from "../../components";
import RootStore from "../../store";
import { get } from "../../utils";

interface Props {
    location: any;
    match: any;
    history: any;
    rootStore: RootStore;
}

class TransactionClass extends React.Component<Props> {
    async componentWillMount() {
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
        if (id !== "new") {
            const transaction = get(() => state.transaction);
            if (transaction) {
                initForm(
                    transaction.amountCents,
                    transaction.name,
                    transaction.description,
                    transaction.date,
                    transaction.budget
                );
            } else {
                try {
                    await getTransaction();
                } catch (e) {
                    history.replace("/transactions");
                }
            }
        }
        getBudgets();
        if (!transactions.length) {
            getTransactions();
        }
    }

    componentWillUnmount() {
        this.props.rootStore.transactionFormStore.reset();
    }

    onChangeName = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setName(e.target.value);
    };

    onChangeAmount = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setAmount(e.target.value);
    };

    onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.transactionFormStore.setDescription(
            e.target.value
        );
    };

    onChangeDate = (date: Moment | null) => {
        this.props.rootStore.transactionFormStore.setDate(date);
    };

    onChangeDateFocused = ({ focused }: { focused: boolean | null }) => {
        this.props.rootStore.transactionFormStore.setDateFocused(!!focused);
    };

    onSubmit = async (e: React.FormEvent) => {
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

    onOutsideClick = () => {
        this.props.rootStore.transactionFormStore.handleOutsideClick();
    };

    onClickDelete = async () => {
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

    render() {
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
                    isLoading,
                    isDeleting,
                    networkActive,
                    startDelete,
                    validations,
                    amountError,
                    budgetError,
                    dateError,
                    nameError,
                    setBudget
                }
            }
        } = this.props;
        const title = `${isUpdatable ? "Update" : "Create"} Transaction`;
        return (
            <DocumentTitle title={`${title} | Wilbur`}>
                <Grid maxWidth="md" ph={{ xs: 2, md: 12 }}>
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
                                    noMargin
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
                                        autofocus
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
                                        value={amount}
                                        onChange={this.onChangeAmount}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <DateField
                                        error={dateError}
                                        focused={dateFocused}
                                        value={date}
                                        onChange={this.onChangeDate}
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
                                            disabled={
                                                !validations.all.valid ||
                                                !validations.all.dirty ||
                                                networkActive
                                            }
                                            isLoading={isLoading}
                                            size={Button.Size.Md}
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
                                                disabled={networkActive}
                                                size={Link.Size.Sm}
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
                                                noBackground
                                                size={Button.Size.Md}
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
                                        <Text
                                            color={Text.Color.Red3}
                                            size={Text.Size.Sm}
                                        >
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
