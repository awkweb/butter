import { action, decorate, computed, observable } from "mobx";
import RootStore from "./index";
import {
    email,
    helpers,
    minLength,
    required,
    sameAs
} from "../lib/validate/validators";
import {
    Validator,
    Validation,
    Validations,
    validateAll
} from "../lib/validate";
import api from "../api";
import { get } from "../lib/get";

interface Props {
    rootStore: RootStore;
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
    setEmail: Function;
    setPassword: Function;
    setPasswordConfirm: Function;
    register: Function;
    reset: Function;
}

export default class RegisterStore implements Props {
    rootStore: RootStore;
    emailValidator: Validator;
    passwordValidator: Validator;
    passwordConfirmValidator: Validator;

    email = "";
    error = "";
    isLoading = false;
    password = "";
    passwordConfirm = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.emailValidator = new Validator(this.email, {
            email,
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

    setEmail = (email: string) => {
        this.email = email;
    };

    setPassword = (password: string) => {
        this.password = password;
    };

    setPasswordConfirm = (passwordConfirm: string) => {
        this.passwordConfirm = passwordConfirm;
    };

    register = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: user } = await api.register(
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

    reset() {
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
