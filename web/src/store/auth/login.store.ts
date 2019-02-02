import { action, computed, decorate, observable } from "mobx";

import api from "../../api";
import { get } from "../../lib/get";
import {
    validateAll,
    Validation,
    Validations,
    Validator
} from "../../lib/validate";
import { email as vEmail, required } from "../../lib/validate/validators";
import RootStore from "../index";

interface Props {
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
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    logIn: () => void;
    reset: () => void;
}

export default class LogInStore implements Props {
    public emailValidator: Validator;
    public passwordValidator: Validator;

    public email = "";
    public error = "";
    public isLoading = false;
    public password = "";
    public redirectToReferrer = false;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.emailValidator = new Validator(this.email, {
            vEmail,
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

    public setEmail = (email: string) => {
        this.email = email;
    };

    public setPassword = (password: string) => {
        this.password = password;
    };

    public logIn = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: user } = await api.auth.logIn(
                this.email,
                this.password
            );
            this.rootStore.setUser(user);
            this.redirectToReferrer = true;
        } catch (err) {
            const error = get(() => err.response.data);
            if ("email" in error) {
                this.error = get(() => error.email[0]);
            } else if ("password" in error) {
                this.error = get(() => error.password[0]);
            } else if ("nonFieldErrors" in error) {
                this.error = get(() => error.nonFieldErrors[0]);
            }
        } finally {
            this.isLoading = false;
        }
    };

    public reset() {
        this.email = "";
        this.error = "";
        this.isLoading = false;
        this.password = "";
        this.redirectToReferrer = false;
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
    logIn: action,
    reset: action
});
