import { action, computed, decorate, observable } from "mobx";
import moment, { Moment } from "moment";

import api from "../api";
import { toAmount, toCents } from "../lib/currency";
import { get } from "../lib/get";
import {
    validateAll,
    Validation,
    Validations,
    Validator
} from "../lib/validate";
import { numeric, required } from "../lib/validate/validators";
import { Budget } from "../types/budget";

import RootStore from "./index";

interface Props {
    amountValidator: Validator;
    budgetValidator: Validator;
    dateValidator: Validator;
    nameValidator: Validator;
    /**
     * observable
     */
    amount: number | undefined;
    budget: { value: string; label: string } | undefined;
    budgets: Budget[];
    date: Moment | null;
    dateFocused: boolean;
    description: string;
    error: string;
    id: string;
    isLoading: boolean;
    isDeleting: boolean;
    initialAmount: number | undefined;
    name: string;
    startDelete: boolean;
    /**
     * computed
     */
    budgetId: string;
    dateString: string;
    isUpdatable: boolean;
    isFormDisabled: boolean;
    networkActive: boolean;
    amountValidation: Validation;
    dateValidation: Validation;
    nameValidation: Validation;
    validations: Validations;
    amountError: string | undefined;
    budgetError: string | undefined;
    dateError: string | undefined;
    nameError: string | undefined;
    /**
     * action
     */
    getBudgets: () => void;
    getTransaction: () => void;
    handleCreate: () => void;
    handleDelete: () => void;
    handleOutsideClick: () => void;
    handleUpdate: () => void;
    initForm: (
        amountCents: number,
        budget: Budget,
        date: Moment,
        description: string,
        name: string
    ) => void;
    reset: () => void;
    setAmount: (amount: number) => void;
    setBudget: (budget: any) => void;
    setDescription: (description: string) => void;
    setDate: (date: Moment | null) => void;
    setDateFocused: (dateFocused: boolean) => void;
    setId: (id: string) => void;
    setName: (name: string) => void;
}

export default class TransactionFormStore implements Props {
    public amountValidator: Validator;
    public budgetValidator: Validator;
    public dateValidator: Validator;
    public nameValidator: Validator;

    public amount: number | undefined = undefined;
    public budget: { value: string; label: string } | undefined = undefined;
    public budgets: Budget[] = [];
    public date: Moment | null = null;
    public dateFocused = false;
    public description = "";
    public error = "";
    public id = "";
    public isDeleting = false;
    public isLoading = false;
    public initialAmount: number | undefined = undefined;
    public name = "";
    public startDelete = false;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.amountValidator = new Validator(this.amount, {
            required,
            numeric
        });
        this.budgetValidator = new Validator(this.budget, { required });
        this.dateValidator = new Validator(this.date, { required });
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

    get isFormDisabled(): boolean {
        return (
            !this.validations.all.valid ||
            !this.validations.all.dirty ||
            this.networkActive
        );
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

    get nameValidation() {
        return this.nameValidator.validate(this.name);
    }

    get validations(): Validations {
        return {
            amount: this.amountValidation,
            budget: this.budgetValidation,
            date: this.dateValidation,
            name: this.nameValidation,
            all: validateAll(
                this.amountValidation,
                this.budgetValidation,
                this.dateValidation,
                this.nameValidation
            )
        };
    }

    get amountError(): string | undefined {
        let error;
        if (!this.amountValidation.required) {
            error = "Amount is required";
        } else if (!this.amountValidation.numeric) {
            error = "Amount must be numeric";
        }
        return error;
    }

    get budgetError(): string | undefined {
        let error;
        if (!this.budgetValidation.required) {
            error = "Budget is required";
        }
        return error;
    }

    get dateError(): string | undefined {
        let error;
        if (!this.dateValidation.required) {
            error = "Date is required";
        }
        return error;
    }

    get nameError(): string | undefined {
        let error;
        if (!this.nameValidation.required) {
            error = "Name is required";
        }
        return error;
    }

    public getBudgets = async () => {
        try {
            const { data: budgets } = await api.budgets.getBulk();
            this.budgets = budgets.sort((a: Budget, b: Budget) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public getTransaction = async () => {
        try {
            const { data: transaction } = await api.transactions.get(this.id);
            this.initForm(
                transaction.amountCents,
                transaction.budget,
                transaction.date,
                transaction.description,
                transaction.name
            );
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public handleCreate = async () => {
        try {
            this.isLoading = true;
            const amountCents = toCents(this.amount as number);
            const { data: transaction } = await api.transactions.create({
                name: this.name,
                amount_cents: amountCents,
                description: this.description,
                date: this.dateString,
                budget: this.budgetId
            });
            this.rootStore.transactionsStore.addTransaction(transaction);
            this.rootStore.budgetsStore.changeTransactions(
                this.budgetId,
                amountCents,
                1
            );
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    public handleDelete = async () => {
        if (this.startDelete) {
            try {
                this.isDeleting = true;
                await api.transactions.delete(this.id);
                this.rootStore.transactionsStore.removeTransaction(this.id);
                this.rootStore.budgetsStore.changeTransactions(
                    this.budgetId,
                    -toCents(this.amount as number),
                    -1
                );
            } catch (err) {
                const error = get(() => err.response.data);
                this.error = error;
            } finally {
                this.startDelete = false;
                this.isDeleting = false;
            }
        } else {
            this.startDelete = true;
        }
    };

    public handleOutsideClick = () => {
        this.startDelete = false;
    };

    public handleUpdate = async () => {
        try {
            this.isLoading = true;
            const amountCents = toCents(this.amount as number);
            const initialAmountCents = toCents(this.initialAmount as number);
            const budget = this.budgetId;

            const { data: transaction } = await api.transactions.update(
                this.id,
                {
                    budget,
                    name: this.name,
                    amount_cents: amountCents,
                    description: this.description,
                    date: this.dateString
                }
            );

            this.rootStore.transactionsStore.updateTransaction(transaction);
            const difference = initialAmountCents - amountCents;
            if (difference !== 0) {
                this.rootStore.budgetsStore.changeTransactions(
                    budget,
                    difference,
                    0
                );
            }
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    public initForm = (
        amountCents: number,
        budget: Budget,
        date: Moment,
        description: string,
        name: string
    ) => {
        const amount = toAmount(amountCents);
        this.amount = amount;
        this.initialAmount = amount;
        this.budget = budget && { label: budget.name, value: budget.id };
        this.name = name;
        this.description = description;
        this.date = moment(date);

        this.amountValidator = new Validator(this.amount, {
            required,
            numeric
        });
        this.budgetValidator = new Validator(this.budget, { required });
        this.dateValidator = new Validator(this.date, { required });
        this.nameValidator = new Validator(this.name, { required });
    };

    public reset = () => {
        this.amount = undefined;
        this.budgets = [];
        this.budget = undefined;
        this.date = null;
        this.description = "";
        this.error = "";
        this.id = "";
        this.isLoading = false;
        this.isDeleting = false;
        this.initialAmount = undefined;
        this.name = "";
        this.startDelete = false;
    };

    public setAmount = (amount: number) => {
        this.amount = amount;
    };

    public setBudget = (budget: any) => {
        this.budget = budget;
    };

    public setDate = (date: Moment | null) => {
        this.date = date;
    };

    public setDateFocused = (dateFocused: boolean) => {
        this.dateFocused = dateFocused;
    };

    public setDescription = (description: string) => {
        this.description = description.slice(0, 241);
    };

    public setId = (id: string) => {
        this.id = id;
    };

    public setName = (name: string) => {
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
    initialAmount: observable,
    name: observable,
    startDelete: observable,
    /**
     * computed
     */
    budgetId: computed,
    dateString: computed,
    isUpdatable: computed,
    isFormDisabled: computed,
    networkActive: computed,
    amountValidation: computed,
    budgetValidation: computed,
    dateValidation: computed,
    nameValidation: computed,
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
