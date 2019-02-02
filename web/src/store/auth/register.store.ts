import { action, computed, decorate, observable } from "mobx";

import api from "../../api";
import { get } from "../../lib/get";
import {
    validateAll,
    Validation,
    Validations,
    Validator
} from "../../lib/validate";
import {
    email as vEmail,
    helpers,
    minLength,
    required,
    sameAs
} from "../../lib/validate/validators";
import RootStore from "../index";

interface Props {
    emailValidator: Validator;
    passwordValidator: Validator;
    passwordConfirmValidator: Validator;
    /**
     * observable
     */
    email: string;
    error: string;
    isLoading: boolean;
    password: string;
    passwordConfirm: string;
    /**
     * computed
     */
    emailValidation: Validation;
    passwordValidation: Validation;
    passwordConfirmValidation: Validation;
    validations: Validations;
    /**
     * action
     */
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setPasswordConfirm: (passwordConfirm: string) => void;
    register: () => void;
    reset: () => void;
}

export default class RegisterStore implements Props {
    public emailValidator: Validator;
    public passwordValidator: Validator;
    public passwordConfirmValidator: Validator;

    public email = "";
    public error = "";
    public isLoading = false;
    public password = "";
    public passwordConfirm = "";

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.emailValidator = new Validator(this.email, {
            vEmail,
            required
        });
        this.passwordValidator = new Validator(this.password, {
            digit: helpers.regex("digit", /^.*[0-9]+.*$/),
            lowercase: helpers.regex("lowercase", /^.*[a-z]+.*$/),
            minLength: minLength(8),
            required,
            uppercase: helpers.regex("uppercase", /^.*[A-Z]+.*$/)
        });
        this.passwordConfirmValidator = new Validator(this.passwordConfirm, {
            required,
            sameAs: sameAs.call(this, "password")
        });
    }

    get emailValidation() {
        return this.emailValidator.validate(this.email);
    }

    get passwordValidation() {
        return this.passwordValidator.validate(this.password);
    }

    get passwordConfirmValidation() {
        return this.passwordConfirmValidator.validate(this.passwordConfirm);
    }

    get validations(): Validations {
        return {
            email: this.emailValidation,
            password: this.passwordValidation,
            passwordConfirm: this.passwordConfirmValidation,
            all: validateAll(
                this.emailValidation,
                this.passwordValidation,
                this.passwordConfirmValidation
            )
        };
    }

    public setEmail = (email: string) => {
        this.email = email;
    };

    public setPassword = (password: string) => {
        this.password = password;
    };

    public setPasswordConfirm = (passwordConfirm: string) => {
        this.passwordConfirm = passwordConfirm;
    };

    public register = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: user } = await api.auth.register(
                this.email,
                this.password,
                this.passwordConfirm
            );
            this.rootStore.setUser(user);
        } catch (err) {
            const error = get(() => err.response.data);
            if ("email" in error) {
                this.error = get(() => error.email[0]);
            } else if ("password" in error) {
                this.error = get(() => error.password[0]);
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
        this.passwordConfirm = "";
    }
}
decorate(RegisterStore, {
    /**
     * observable
     */
    email: observable,
    error: observable,
    isLoading: observable,
    password: observable,
    passwordConfirm: observable,
    /**
     * computed
     */
    emailValidation: computed,
    passwordValidation: computed,
    passwordConfirmValidation: computed,
    validations: computed,
    /**
     * action
     */
    setEmail: action,
    setPassword: action,
    setPasswordConfirm: action,
    register: action,
    reset: action
});
