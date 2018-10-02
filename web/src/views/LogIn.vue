<template>
    <div class="auth">
        <div class="auth__container">
            <h1 class="auth__header">Welcome back</h1>

            <div class="auth__info">
                Need an account?
                <router-link :to="{ name: 'SignUp', query: { email: this.email }}">
                Sign up
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
                        type="email"
                    >
                </fieldset>

                <fieldset class="form__field">
                    <label
                        :class="['form__label', {
                            'active': (password && password.length) || (passwordTouched || ($v.password.$dirty && $v.password.$invalid)),
                            'error': passwordTouched && $v.password.$invalid
                        }]"
                        for="password"
                   >
                        <span v-if="passwordTouched && !$v.password.required">Password is required</span>
                        <span v-else>Password</span>
                    </label>
                    <input
                        v-model="password"
                        :class="['form__input', { 'error': passwordTouched && $v.password.$invalid }]"
                        @blur="passwordTouched = true"
                        id="password"
                        placeholder="Password"
                        type="password"
                    >
                </fieldset>

                <button
                    :class="['auth__button', { loading }]"
                    :disabled="$v.validationGroup.$invalid || loading"
                    @click.prevent="onClickLogIn"
                    @keyup.enter="onClickLogIn"
                >
                    {{ loading ? 'Logging in...' : 'Log in' }}
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
import { email, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'

export default {
    name: 'LogIn',
    data: () => ({
        email: null,
        emailTouched: false,
        error: null,
        loading: false,
        password: null,
        passwordTouched: false,
        persistUser: false,
    }),
    created() {
        if (this.$route.query.email) this.email = this.$route.query.email
    },
    methods: {
        ...mapActions(['LOG_IN_USER']),
        onClickLogIn() {
            this.loading = true
            this.LOG_IN_USER({
                email: this.email,
                password: this.password,
            })
                .then(() => this.$router.push({ name: 'Inbox' }))
                .catch(err => {
                    let error
                    if ('email' in err) {
                        error = get(() => err.email[0])
                    } else if ('password' in err) {
                        error = get(() => err.password[0])
                    } else if ('non_field_errors' in err) {
                        error = get(() => err.non_field_errors[0])
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
            required,
        },
        validationGroup: ['email', 'password'],
    },
    metaInfo: {
        title: 'Log In',
    },
}
</script>

<style lang="scss">
@import '../assets/styles/auth';
@import '../assets/styles/form';
</style>
