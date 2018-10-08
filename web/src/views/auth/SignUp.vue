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

            <div
                v-if="error"
                class="auth__error"
            >
                {{ error }}
            </div>

            <form class="auth__form">
                <Field
                    v-model="email"
                    :isValid="!$v.email.$invalid"
                    autofocus
                    id="email"
                    label="Email"
                    showSuccess
                />

                <Field
                    v-model="password"
                    :isValid="!$v.password.$invalid"
                    id="password"
                    label="Password"
                    showSuccess
                    type="password"
                />

                <PasswordFeatures
                    :hasLowercaseLetter="(password && $v.password.lowercase) || false"
                    :hasUppercaseLetter="(password && $v.password.uppercase) || false"
                    :hasNumber="(password && $v.password.digit) || false"
                    :isMinLength="(password && $v.password.minLength) || false"
                />

                <Field
                    v-model="passwordConfirm"
                    :isValid="!$v.passwordConfirm.$invalid"
                    id="confirm-password"
                    label="Confirm Password"
                    showSuccess
                    type="password"
                />

                <button
                    :class="['auth__button', { loading }]"
                    :disabled="$v.validationGroup.$invalid || loading"
                    @click.prevent="onClickSignUp"
                    @keyup.enter="onClickSignUp"
                >
                    {{ loading ? 'Creating account...' : 'Sign Up' }}
                </button>

                <div class="auth__subtext">
                    By clicking this button, you agree Ferns’ <a href="">Terms of Use</a>.
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
import Field from '@/components/Field'
import InputSuccessIcon from '@/assets/icons/input-success.svg'
import PasswordFeatures from '@/components/PasswordFeatures'

export default {
    name: 'SignUp',
    components: {
        Field,
        InputSuccessIcon,
        PasswordFeatures,
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
        async onClickSignUp() {
            this.error = null
            this.loading = true
            try {
                await this.SIGN_UP_USER({
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm,
                })
                this.$router.push({ name: 'Budgets' })
            } catch (err) {
                let error
                if ('email' in err) {
                    error = get(() => err.email[0])
                } else if ('password' in err) {
                    error = get(() => err.password[0])
                }
                this.loading = false
                this.error = error
            }
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
@import '../../assets/styles/auth';
</style>
