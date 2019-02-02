import { inject, observer } from "mobx-react";
import React from "react";
import DocumentTitle from "react-document-title";
import OutsideClickHandler from "react-outside-click-handler";

import {
    Box,
    Button,
    Col,
    Field,
    Grid,
    Link,
    Row,
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

class BudgetClass extends React.Component<Props> {
    public async componentWillMount() {
        const {
            history,
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
                try {
                    await getBudget();
                } catch (e) {
                    history.replace("/budgets");
                }
            }
        }
        if (budgets.length) {
            return;
        }
        getBudgets();
    }

    public componentWillUnmount() {
        this.props.rootStore.budgetFormStore.reset();
    }

    public onChangeName = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setName(e.target.value);
    };

    public onChangeAmount = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setAmount(e.target.value);
    };

    public onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.budgetFormStore.setDescription(e.target.value);
    };

    public onSubmit = async (e: React.FormEvent) => {
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

    public onClickDelete = async () => {
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

    public render() {
        const {
            rootStore: {
                budgetFormStore: {
                    name,
                    amount,
                    description,
                    error,
                    isFormDisabled,
                    isUpdatable,
                    isLoading,
                    isDeleting,
                    networkActive,
                    startDelete,
                    amountError,
                    nameError,
                    handleOutsideClick
                }
            }
        } = this.props;
        const title = `${isUpdatable ? "Update" : "Create"} Budget`;
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
                                                to="/budgets"
                                            >
                                                Cancel
                                            </Link>
                                        </Box>
                                    </Box>

                                    {isUpdatable && (
                                        <OutsideClickHandler
                                            onOutsideClick={handleOutsideClick}
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

export const Budget = inject("rootStore")(observer(BudgetClass));
