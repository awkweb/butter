<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__header">Welcome back</h1>

      <div class="auth__info">Need an account?
        <router-link :to="{ name: 'Register', query: { email: this.email }}">Sign up</router-link>
      </div>

      <div v-if="error" class="auth__error">{{ error }}</div>

      <form class="auth__form">
        <Field v-model="email" :isValid="!$v.email.$invalid" autofocus id="email" label="Email"/>

        <Field
          v-model="password"
          :isValid="!$v.password.$invalid"
          id="password"
          label="Password"
          type="password"
        />

        <button
          :class="['auth__button', { loading }]"
          :disabled="$v.validationGroup.$invalid || loading"
          @click.prevent="onClickLogIn"
          @keyup.enter="onClickLogIn"
        >{{ loading ? 'Logging in...' : 'Log in' }}</button>

        <div class="auth__subtext">So splendid to see you again, Old Sport.</div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Field from '@/components/forms/Field'

export default {
    name: 'LogIn',
    components: {
        Field,
    },
    props: {
        emailParam: {
            type: String,
        },
    },
    data() {
        return {
            email: get(() => this.emailParam),
            error: undefined,
            loading: false,
            password: undefined,
        }
    },
    methods: {
        ...mapActions(['LOG_IN_USER']),
        async onClickLogIn() {
            this.error = undefined
            this.loading = true
            try {
                await this.LOG_IN_USER({
                    email: this.email,
                    password: this.password,
                })
                this.$router.push({ name: 'Budgets' })
            } catch (err) {
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
            }
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
@import '../../assets/styles/auth';
</style>
