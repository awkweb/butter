import React from "react";
import { inject, observer } from "mobx-react";
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
    Link
} from "../../components";
import RootStore from "../../store";
import { get } from "../../utils";

interface Props {
    location: any;
    match: any;
    history: any;
    rootStore: RootStore;
}

class BudgetClass extends React.Component<Props> {
    componentWillMount() {
        const {
            match: {
                params: { id }
            },
            location: { state },
            rootStore: {
                budgetFormStore: { initForm, getBudget, setId },
                budgetsStore: { budgets, getBudgets }
            }
        } = this.props;
        setId(id);
        if (id !== "new") {
            const budget = get(() => state.budget);
            if (budget) {
                const amountCents = budget.budgeted;
                initForm(amountCents, budget.name, budget.description);
            } else {
                getBudget();
            }
        }
        if (budgets.length) {
            return;
        }
        getBudgets();
    }

    componentWillUnmount() {
        this.props.rootStore.budgetFormStore.reset();
    }

    onChangeName = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setName(e.target.value);
    };

    onChangeAmount = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setAmount(e.target.value);
    };

    onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setDescription(e.target.value);
    };

    onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {
            history,
            rootStore: {
                budgetFormStore: { isUpdatable, handleUpdate, handleCreate }
            }
        } = this.props;
        if (isUpdatable) {
            handleUpdate();
            history.push("/budgets");
        } else {
            await handleCreate();
            history.push("/budgets");
        }
    };

    onOutsideClick = () => {
        this.props.rootStore.budgetFormStore.handleOutsideClick();
    };

    onClickDelete = async () => {
        const {
            history,
            rootStore: {
                budgetFormStore: { handleDelete, startDelete }
            }
        } = this.props;
        await handleDelete();
        if (startDelete) {
            history.push("/budgets");
        }
    };

    render() {
        const {
            rootStore: {
                budgetFormStore: {
                    name,
                    amount,
                    description,
                    error,
                    isUpdatable,
                    isLoading,
                    isDeleting,
                    networkActive,
                    startDelete,
                    validations,
                    amountError,
                    nameError
                }
            }
        } = this.props;
        const title = `${isUpdatable ? "Update" : "Create"} Budget`;
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
                                                to="/budgets"
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

export const Budget = inject("rootStore")(observer(BudgetClass));
