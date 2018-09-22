<template>
    <div>
        <div>
            <h1>Log In</h1>
            <form>
                <div v-if="error">
                    {{ error.message }}
                </div>

                <div>
                    <label>Email Address</label>
                    <input
                        v-model="email"
                        :class="['auth__input', { 'success': !$v.email.$invalid }]"
                        placeholder="tom@meagher.co"
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

                <button
                    :class="['auth__button', { loading }]"
                    :disabled="$v.validationGroup.$invalid || loading"
                    @click.prevent="onClickLogIn"
                    @keyup.enter="onClickLogIn"
                >
                    {{ loading ? 'Logging in...' : 'Log In' }}
                </button>
            </form>

            <div>
                Don't have a Budget account?
                <router-link :to="{ name: 'LogIn', query: { email: this.email }}">
                Sign up here
                </router-link>
            </div>
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
        error: null,
        loading: false,
        password: null,
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
                .then(() => this.$router.push({ name: 'Dashboard' }))
                .catch(err => {
                    let error
                    if ('email' in err) {
                        error = get(() => err.email[0])
                    } else if ('password' in err) {
                        error = get(() => err.password[0])
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
        },
        validationGroup: ['email', 'password'],
    },
    metaInfo: {
        title: 'Log In',
    },
}
</script>
