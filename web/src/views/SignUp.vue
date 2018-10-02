<template>
    <div class="auth">
        <div class="auth__container">
            <h1 class="auth__header">Register an account</h1>

            <div class="auth__info">
                Been here before?
                <router-link :to="{ name: 'LogIn', query: { email: this.email }}">
                Log in
                </router-link>
            </div>

            <form class="auth__form">
                <fieldset class="form__field">
                    <label
                        :class="['form__label', {
                            'active': (email && email.length) || (emailTouched || ($v.email.$dirty && $v.email.$invalid)),
                            'error': emailTouched && $v.email.$invalid
                        }]"
                        for="email"
                    >
                        <span v-if="emailTouched && !$v.email.email">Email is invalid</span>
                        <span v-else-if="emailTouched && !$v.email.required">Email is required</span>
                        <span v-else>Email</span>
                    </label>
                    <input
                        v-focus
                        v-model="email"
                        :class="['form__input', { 'error': emailTouched && $v.email.$invalid }]"
                        @blur="emailTouched = true"
                        id="email"
                        placeholder="Email"
                        spellcheck="false"
                        type="text"
                    >
                    <div
                        v-show="!$v.email.$invalid"
                        class="auth__success"
                    >
                        <InputSuccessIcon />
                    </div>
                </fieldset>

                <fieldset class="form__field">
                    <label
                        :class="['form__label', {
                            'active': (password && password.length) || (passwordTouched || ($v.password.$dirty && $v.password.$invalid)),
                            'error': passwordTouched && $v.password.$invalid
                        }]"
                        label="password"
                    >
                        <span v-if="passwordTouched && !$v.password.capital">At least one uppercase letter</span>
                        <span v-else-if="passwordTouched && !$v.password.digit">At least one digit</span>
                        <span v-else-if="passwordTouched && !$v.password.minLength">At least 8 characters</span>
                        <span v-else-if="passwordTouched && !$v.password.required">Password is required</span>
                        <span v-else>Password</span>
                    </label>
                    <input
                        v-model="password"
                        :class="['form__input', {
                            'error': passwordTouched && $v.password.$invalid,
                        }]"
                        @blur="passwordTouched = true"
                        id="password"
                        placeholder="Password"
                        type="password"
                    >
                    <div
                        v-show="!$v.password.$invalid"
                        class="auth__success"
                    >
                        <InputSuccessIcon />
                    </div>
                </fieldset>

                <fieldset class="form__field no-margin">
                    <label
                        :class="['form__label', {
                            'active': (passwordConfirm && passwordConfirm.length) || (passwordConfirmTouched || ($v.passwordConfirm.$dirty && $v.passwordConfirm.$invalid)),
                            'error': passwordConfirmTouched && $v.passwordConfirm.$invalid
                        }]"
                        for="confirm-password"
                    >
                        <span v-if="passwordConfirmTouched && !$v.passwordConfirm.sameAs">Passwords must match</span>
                        <span v-else-if="passwordConfirmTouched && !$v.passwordConfirm.required">Confirm Password is required</span>
                        <span v-else>Confirm Password</span>
                    </label>
                    <input
                        v-model="passwordConfirm"
                        :class="['form__input', { 'error': passwordConfirmTouched && $v.passwordConfirm.$invalid }]"
                        @blur="passwordConfirmTouched = true"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        type="password"
                    >
                    <div
                        v-show="!$v.passwordConfirm.$invalid"
                        class="auth__success"
                    >
                        <InputSuccessIcon />
                    </div>
                </fieldset>

                <fieldset class="form__field checkbox">
                    <input
                        v-model="tos"
                        class="form__input checkbox"
                        id="tos"
                        type="checkbox"
                    >
                    <label
                        class="form__label checkbox"
                        for="tos"
                    >
                        I agree and conset to Budget's <a href="">Terms of Use</a> and <a href="">Privacy Policy</a>.
                    </label>
                </fieldset>

                <button
                    :class="['auth__button', { loading }]"
                    :disabled="$v.validationGroup.$invalid || loading"
                    @click.prevent="onClickSignUp"
                    @keyup.enter="onClickSignUp"
                >
                    {{ loading ? 'Creating account...' : 'Sign Up' }}
                </button>

                <div
                    v-if="error"
                    class="auth_error"
                >
                    {{ error }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
    email,
    helpers,
    minLength,
    required,
    sameAs,
} from 'vuelidate/lib/validators'
import { get } from '@/utils'
import InputSuccessIcon from '@/assets/icons/input-success.svg'

const capital = helpers.regex('capital', /^.*[A-Z]+.*$/)
const digit = helpers.regex('capital', /^.*[0-9]+.*$/)

export default {
    name: 'SignUp',
    components: {
        InputSuccessIcon,
    },
    data: () => ({
        email: null,
        emailTouched: false,
        error: null,
        loading: false,
        password: null,
        passwordTouched: false,
        passwordConfirm: null,
        passwordConfirmTouched: false,
        persistUser: false,
        tos: false,
    }),
    created() {
        if (this.$route.query.email) this.email = this.$route.query.email
    },
    methods: {
        ...mapActions(['SIGN_UP_USER']),
        onClickSignUp() {
            this.loading = true
            this.SIGN_UP_USER({
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
            })
                .then(() => this.$router.push({ name: 'Inbox' }))
                .catch(err => {
                    let error
                    if ('email' in err) {
                        error = get(() => err.email[0])
                    } else if ('password' in err) {
                        error = get(() => err.password[0])
                    } else if ('password_confirm' in err) {
                        error = get(() => err.password_confirm[0])
                    }
                    this.loading = false
                    this.error = error
                })
        },
    },
    validations: {
        email: {
            email,
            required,
        },
        password: {
            capital,
            digit,
            minLength: minLength(8),
            required,
        },
        passwordConfirm: {
            sameAs: sameAs('password'),
            required,
        },
        tos: {
            required,
        },
        validationGroup: ['email', 'password', 'passwordConfirm', 'tos'],
    },
    metaInfo: {
        title: 'Sign Up',
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/auth';
@import '../assets/styles/form';
</style>
