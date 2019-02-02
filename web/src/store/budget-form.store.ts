import { action, computed, decorate, observable } from "mobx";

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

import RootStore from "./index";

interface Props {
    amountValidator: Validator;
    nameValidator: Validator;
    descriptionValidator: Validator;
    /**
     * observable
     */
    amount: number | undefined;
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
    isFormDisabled: boolean;
    isUpdatable: boolean;
    networkActive: boolean;
    amountValidation: Validation;
    nameValidation: Validation;
    descriptionValidation: Validation;
    validations: Validations;
    nameError: string | undefined;
    amountError: string | undefined;
    /**
     * action
     */
    getBudget: () => void;
    handleCreate: () => void;
    handleDelete: () => void;
    handleOutsideClick: () => void;
    handleUpdate: () => void;
    initForm: (amountCents: number, name: string, description: string) => void;
    reset: () => void;
    setAmount: (amount: number) => void;
    setDescription: (description: string) => void;
    setId: (id: string) => void;
    setName: (name: string) => void;
}

export default class BudgetFormStore implements Props {
    public amountValidator: Validator;
    public nameValidator: Validator;
    public descriptionValidator: Validator;

    public amount: number | undefined = undefined;
    public description = "";
    public error = "";
    public id = "";
    public isDeleting = false;
    public isLoading = false;
    public name = "";
    public startDelete = false;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.amountValidator = new Validator(this.amount, {
            required,
            numeric
        });
        this.nameValidator = new Validator(this.name, { required });
        this.descriptionValidator = new Validator(this.description);
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

    get nameValidation() {
        return this.nameValidator.validate(this.name);
    }

    get descriptionValidation() {
        return this.descriptionValidator.validate(this.description);
    }

    get validations(): Validations {
        return {
            amount: this.amountValidation,
            name: this.nameValidation,
            description: this.descriptionValidation,
            all: validateAll(
                this.amountValidation,
                this.nameValidation,
                this.descriptionValidation
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

    get nameError(): string | undefined {
        let error;
        if (!this.nameValidation.required) {
            error = "Name is required";
        }
        return error;
    }

    public getBudget = async () => {
        try {
            const { data: budget } = await api.budgets.get(this.id);
            this.initForm(budget.amountCents, budget.name, budget.description);
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public handleCreate = async () => {
        try {
            this.isLoading = true;
            const { data: budget } = await api.budgets.create({
                name: this.name,
                amount_cents: toCents(this.amount as number),
                description: this.description
            });
            this.rootStore.budgetsStore.addBudget({
                ...budget,
                budgeted: budget.amountCents,
                spent: 0
            });
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
                await api.budgets.delete(this.id);
                this.rootStore.budgetsStore.removeBudget(this.id);
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

    public handleOutsideClick = () => {
        this.startDelete = false;
    };

    public handleUpdate = async () => {
        try {
            this.isLoading = true;
            const { data: budget } = await api.budgets.update(this.id, {
                name: this.name,
                amount_cents: toCents(this.amount as number),
                description: this.description
            });
            this.rootStore.budgetsStore.updateBudget(budget);
        } catch (err) {
            const error = get(() => err.response.data);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    public initForm = (
        amountCents: number,
        name: string,
        description: string
    ) => {
        this.amount = toAmount(amountCents);
        this.name = name;
        this.description = description;
        this.amountValidator = new Validator(this.amount, {
            required,
            numeric
        });
        this.nameValidator = new Validator(this.name, { required });
        this.descriptionValidator = new Validator(this.description);
    };

    public reset = () => {
        this.amount = undefined;
        this.description = "";
        this.error = "";
        this.id = "";
        this.isDeleting = false;
        this.isLoading = false;
        this.name = "";
        this.startDelete = false;
    };

    public setAmount = (amount: number) => {
        this.amount = amount;
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
decorate(BudgetFormStore, {
    amount: observable,
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
    isFormDisabled: computed,
    isUpdatable: computed,
    networkActive: computed,
    amountValidation: computed,
    nameValidation: computed,
    descriptionValidation: computed,
    validations: computed,
    nameError: computed,
    amountError: computed,
    /**
     * action
     */
    getBudget: action,
    handleCreate: action,
    handleDelete: action,
    handleOutsideClick: action,
    handleUpdate: action,
    initForm: action,
    reset: action,
    setAmount: action,
    setDescription: action,
    setId: action,
    setName: action
});
