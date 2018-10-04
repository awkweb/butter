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
                            'active': email,
                        }]"
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        v-focus
                        v-model="email"
                        class="form__input"
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
                            'active': password,
                        }]"
                        for="password"
                    >
                        Password
                    </label>
                    <input
                        v-model="password"
                        class="form__input"
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

                <fieldset class="form__field">
                    <label
                        :class="['form__label', {
                            'active': passwordConfirm,
                        }]"
                        for="confirm-password"
                    >
                        Confirm Password
                    </label>
                    <input
                        v-model="passwordConfirm"
                        class="form__input"
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

                <div class="auth__password-features">
                    <ul class="auth__password-feature-list">
                        <li :class="['auth__password-feature', {
                            success: password && $v.password.lowercase
                        }]">
                            One lowercase letter
                        </li>
                        <li :class="['auth__password-feature', {
                            success: password && $v.password.uppercase
                        }]">
                            One uppercase letter
                        </li>
                        <li :class="['auth__password-feature', {
                            success: password && $v.password.digit
                        }]">
                            One number
                        </li>
                    </ul>
                    <ul class="auth__password-feature-list">
                        <li :class="['auth__password-feature', {
                            success: password && $v.password.minLength
                        }]">
                            8 characters minimum
                        </li>
                        <li :class="['auth__password-feature', {
                            success: passwordConfirm && $v.passwordConfirm.sameAs
                        }]">
                            Passwords match
                        </li>
                    </ul>
                </div>

                <button
                    :class="['auth__button', { loading }]"
                    :disabled="$v.validationGroup.$invalid || loading"
                    @click.prevent="onClickSignUp"
                    @keyup.enter="onClickSignUp"
                >
                    {{ loading ? 'Creating account...' : 'Sign Up' }}
                </button>

                <div class="auth__subtext">
                    By clicking this button, you agree Budget's <a href="">Terms of Use</a>.
                </div>

                <div
                    v-if="error"
                    class="auth__error"
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

export default {
    name: 'SignUp',
    components: {
        InputSuccessIcon,
    },
    data: () => ({
        email: null,
        error: null,
        loading: false,
        password: null,
        passwordConfirm: null,
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
            digit: helpers.regex('digit', /^.*[0-9]+.*$/),
            lowercase: helpers.regex('lowercase', /^.*[a-z]+.*$/),
            minLength: minLength(8),
            required,
            uppercase: helpers.regex('uppercase', /^.*[A-Z]+.*$/),
        },
        passwordConfirm: {
            sameAs: sameAs('password'),
            required,
        },
        validationGroup: ['email', 'password', 'passwordConfirm'],
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
