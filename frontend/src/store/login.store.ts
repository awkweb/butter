import { action, decorate, computed, observable } from "mobx";
import RootStore from "./index";
import { email, required } from "../lib/validate/validators";
import {
    Validator,
    Validation,
    Validations,
    validateAll
} from "../lib/validate";

interface Props {
    rootStore: RootStore;
    emailValidator: Validator;
    passwordValidator: Validator;
    /**
     * observable
     */
    email: string;
    error: string;
    isLoading: boolean;
    password: string;
    redirectToReferrer: boolean;
    /**
     * computed
     */
    emailValidation: Validation;
    passwordValidation: Validation;
    validations: Validations;
    /**
     * action
     */
    setEmail: Function;
    setPassword: Function;
    logIn: Function;
}

export default class LogInStore implements Props {
    rootStore: RootStore;
    emailValidator: Validator;
    passwordValidator: Validator;

    email = "";
    error = "";
    isLoading = false;
    password = "";
    redirectToReferrer = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.emailValidator = new Validator(this.email, {
            email,
            required
        });
        this.passwordValidator = new Validator(this.password, {
            required
        });
    }

    get emailValidation() {
        return this.emailValidator.validate(this.email);
    }

    get passwordValidation() {
        return this.passwordValidator.validate(this.password);
    }

    get validations(): Validations {
        return {
            email: this.emailValidation,
            password: this.passwordValidation,
            all: validateAll(this.emailValidation, this.passwordValidation)
        };
    }

    setEmail = (email: string) => {
        this.email = email;
    };

    setPassword = (password: string) => {
        this.password = password;
    };

    logIn() {
        this.isLoading = true;
        setTimeout(() => {
            this.rootStore.setUser({
                email: this.email
            });
            this.isLoading = false;
            this.redirectToReferrer = true;
        }, 1000);
    }

    reset() {
        this.email = "";
        this.error = "";
        this.isLoading = false;
        this.password = "";
    }
}
decorate(LogInStore, {
    /**
     * observable
     */
    email: observable,
    error: observable,
    isLoading: observable,
    password: observable,
    redirectToReferrer: observable,
    /**
     * computed
     */
    emailValidation: computed,
    passwordValidation: computed,
    validations: computed,
    /**
     * action
     */
    setEmail: action,
    setPassword: action,
    logIn: action
});
