import { decorate, observable, action, computed } from "mobx";
import moment, { Moment } from "moment";
import { ValueType } from "react-select/lib/types";
import RootStore from "./index";
import { required } from "../lib/validate/validators";
import {
    Validator,
    Validation,
    Validations,
    validateAll
} from "../lib/validate";
import { get, toAmount, toCents } from "../utils";
import api from "../api";
import { Budget } from "../types/budget";

interface Props {
    rootStore: RootStore;
    amountValidator: Validator;
    budgetValidator: Validator;
    dateValidator: Validator;
    descriptionValidator: Validator;
    nameValidator: Validator;
    /**
     * observable
     */
    amount: number;
    budget: ValueType<{ value: string; label: string }>;
    budgets: Array<Budget>;
    date: Moment | null;
    dateFocused: boolean;
    description: string;
    error: string;
    id: string;
    isLoading: boolean;
    isDeleting: boolean;
    name: string;
    startDelete: boolean;
    /**
     * computed
     */
    budgetId: string;
    dateString: string;
    isUpdatable: boolean;
    networkActive: boolean;
    amountValidation: Validation;
    dateValidation: Validation;
    descriptionValidation: Validation;
    nameValidation: Validation;
    validations: Validations;
    amountError?: string;
    budgetError?: string;
    dateError?: string;
    nameError?: string;
    /**
     * action
     */
    getBudgets: Function;
    getTransaction: Function;
    handleCreate: Function;
    handleDelete: Function;
    handleOutsideClick: Function;
    handleUpdate: Function;
    initForm: Function;
    reset: Function;
    setAmount: Function;
    setBudget: Function;
    setDescription: Function;
    setDate: Function;
    setDateFocused: Function;
    setId: Function;
    setName: Function;
}

export default class TransactionFormStore implements Props {
    rootStore: RootStore;
    amountValidator: Validator;
    budgetValidator: Validator;
    dateValidator: Validator;
    descriptionValidator: Validator;
    nameValidator: Validator;

    amount = 100;
    budget: ValueType<{ value: string; label: string }> = undefined;
    budgets: Array<Budget> = [];
    date: Moment | null = moment();
    dateFocused = false;
    description = "";
    error = "";
    id = "";
    isDeleting = false;
    isLoading = false;
    name = "";
    startDelete = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.amountValidator = new Validator(this.amount, { required });
        this.budgetValidator = new Validator(this.budget, { required });
        this.dateValidator = new Validator(this.date, { required });
        this.descriptionValidator = new Validator(this.description);
        this.nameValidator = new Validator(this.name, { required });
    }

    get budgetId(): string {
        return get(() => (this.budget as any).value);
    }

    get dateString(): string {
        return get(() => (this.date as Moment).format("YYYY-MM-DD"));
    }

    get isUpdatable(): boolean {
        return this.id !== "new";
    }

    get networkActive(): boolean {
        return this.isLoading || this.isDeleting;
    }

    get amountValidation() {
        return this.amountValidator.validate(this.amount);
    }

    get budgetValidation() {
        return this.budgetValidator.validate(this.budget);
    }

    get dateValidation() {
        return this.dateValidator.validate(this.date);
    }

    get descriptionValidation() {
        return this.descriptionValidator.validate(this.description);
    }

    get nameValidation() {
        return this.nameValidator.validate(this.name);
    }

    get validations(): Validations {
        return {
            amount: this.amountValidation,
            budget: this.budgetValidation,
            date: this.dateValidation,
            description: this.descriptionValidation,
            name: this.nameValidation,
            all: validateAll(
                this.amountValidation,
                this.budgetValidation,
                this.dateValidation,
                this.descriptionValidation,
                this.nameValidation
            )
        };
    }

    get amountError(): string | undefined {
        let error = undefined;
        if (!this.amountValidation.required) {
            error = "Amount is required";
        }
        return error;
    }

    get budgetError(): string | undefined {
        let error = undefined;
        if (!this.budgetValidation.required) {
            error = "Budget is required";
        }
        return error;
    }

    get dateError(): string | undefined {
        let error = undefined;
        if (!this.dateValidation.required) {
            error = "Date is required";
        }
        return error;
    }

    get nameError(): string | undefined {
        let error = undefined;
        if (!this.nameValidation.required) {
            error = "Name is required";
        }
        return error;
    }

    getBudgets = async () => {
        try {
            this.error = "";
            const { data: budgets } = await api.getBudgets();
            this.budgets = budgets;
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        }
    };

    getTransaction = async () => {
        try {
            const { data: transaction } = await api.getTransaction(this.id);
            this.initForm(
                transaction.amountCents,
                transaction.name,
                transaction.description,
                transaction.budget,
                transaction.date
            );
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    handleCreate = async () => {
        try {
            this.isLoading = true;
            const { data: transaction } = await api.createTransaction({
                name: this.name,
                amount_cents: toCents(this.amount),
                description: this.description,
                date: this.dateString,
                budget: this.budgetId
            });
            this.rootStore.transactionsStore.addTransaction(transaction);
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    handleDelete = async () => {
        if (this.startDelete) {
            try {
                this.isDeleting = true;
                await api.deleteTransaction(this.id);
                this.rootStore.transactionsStore.removeTransaction(this.id);
            } catch (err) {
                const error = get(() => err.response.data);
                this.error = error;
                this.startDelete = false;
            } finally {
                this.isDeleting = false;
            }
        } else {
            this.startDelete = true;
        }
    };

    handleOutsideClick = () => {
        this.startDelete = false;
    };

    handleUpdate = async () => {
        try {
            this.isLoading = true;
            const { data: transaction } = await api.updateTransaction(this.id, {
                name: this.name,
                amount_cents: toCents(this.amount),
                description: this.description,
                date: this.dateString,
                budget: this.budgetId
            });
            this.rootStore.transactionsStore.updateTransaction(transaction);
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    initForm = (
        amountCents: number,
        name: string,
        description: string,
        budgetId: string,
        date: Moment
    ) => {
        const budget = this.budgets.find(budget => budget.id === budgetId);
        this.amount = toAmount(amountCents);
        this.name = name;
        this.description = description;
        this.date = moment(date);
        this.budget = budget && { label: budget.name, value: budgetId };
        this.amountValidator = new Validator(this.amount, { required });
        this.dateValidator = new Validator(this.amount, { required });
        this.nameValidator = new Validator(this.name, { required });
        this.descriptionValidator = new Validator(this.description);
    };

    reset = () => {
        this.amount = 100;
        this.budgets = [];
        this.budget = undefined;
        this.date = moment();
        this.description = "";
        this.error = "";
        this.id = "";
        this.isLoading = false;
        this.isDeleting = false;
        this.name = "";
        this.startDelete = false;
    };

    setAmount = (amount: number) => {
        this.amount = amount;
    };

    setBudget = (budget: ValueType<{ value: string; label: string }>) => {
        this.budget = budget;
    };

    setDate = (date: Moment | null) => {
        this.date = date;
    };

    setDateFocused = (dateFocused: boolean) => {
        this.dateFocused = dateFocused;
    };

    setDescription = (description: string) => {
        this.description = description.slice(0, 241);
    };

    setId = (id: string) => {
        this.id = id;
    };

    setName = (name: string) => {
        this.name = name;
    };
}
decorate(TransactionFormStore, {
    amount: observable,
    budget: observable,
    budgets: observable,
    date: observable,
    dateFocused: observable,
    description: observable,
    error: observable,
    id: observable,
    isLoading: observable,
    isDeleting: observable,
    name: observable,
    startDelete: observable,
    /**
     * computed
     */
    budgetId: computed,
    dateString: computed,
    isUpdatable: computed,
    networkActive: computed,
    amountValidation: computed,
    budgetValidation: computed,
    dateValidation: computed,
    nameValidation: computed,
    descriptionValidation: computed,
    validations: computed,
    amountError: computed,
    budgetError: computed,
    dateError: computed,
    nameError: computed,
    /**
     * action
     */
    getBudgets: action,
    getTransaction: action,
    handleCreate: action,
    handleDelete: action,
    handleOutsideClick: action,
    handleUpdate: action,
    initForm: action,
    reset: action,
    setAmount: action,
    setBudget: action,
    setDescription: action,
    setDate: action,
    setDateFocused: action,
    setId: action,
    setName: action
});
