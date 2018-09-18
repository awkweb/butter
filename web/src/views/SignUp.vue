<template>
  <div>
    <div>
      <h1>Sign Up</h1>
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
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
    name: 'SignUp',
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
        ...mapActions(['SIGN_UP_USER']),
        onClickSignUp() {
            this.loading = true
            this.SIGN_UP_USER({
                email: this.email,
                password: this.password,
            })
                .then(() => this.$router.push({ name: 'App' }))
                .catch(err => {
                    this.loading = false
                    this.error = err
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
            minLength: minLength(6),
        },
        validationGroup: ['email', 'password'],
    },
    metaInfo: {
        title: 'Sign Up',
    },
}
</script>
