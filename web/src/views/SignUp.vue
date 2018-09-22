<template>
<div>
    <div>
        <h1>Sign Up</h1>
        <form>
            <div v-if="error">
                {{ error }}
            </div>

            <div>
                <label>Email Address</label>
                <input
                    v-model="email"
                    :class="['auth__input', { 'success': !$v.email.$invalid }]"
                    placeholder="Email Address"
                    spellcheck="false"
                    type="text"
                >
            </div>

            <div>
                <label>Password</label>
                <input
                    v-model="password"
                    :class="['auth__input', { 'success': !$v.password.$invalid }]"
                    placeholder="Password"
                    type="password"
                >
            </div>

            <div>
                <label>Confirm Password</label>
                <input
                    v-model="passwordConfirm"
                    :class="['auth__input', { 'success': !$v.passwordConfirm.$invalid }]"
                    placeholder="Confirm Password"
                    type="password"
                >
            </div>

            <button
                :class="['auth__button', { loading }]"
                :disabled="$v.validationGroup.$invalid || loading"
                @click.prevent="onClickSignUp"
                @keyup.enter="onClickSignUp"
            >
                {{ loading ? 'Creating account...' : 'Sign Up' }}
            </button>
        </form>

        <div>
            Already have a Budget account?
            <router-link :to="{ name: 'LogIn', query: { email: this.email }}">
            Log in here
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
import { get } from '@/utils'

export default {
    name: 'SignUp',
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
                .then(() => this.$router.push({ name: 'Dashboard' }))
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
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(8),
        },
        passwordConfirm: {
            sameAs: sameAs('password'),
        },
        validationGroup: ['email', 'password', 'passwordConfirm'],
    },
    metaInfo: {
        title: 'Sign Up',
    },
}
</script>
