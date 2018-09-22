<template>
  <div class="home">
      <button
        @click="onClickLogOut"
      >
          Log Out
      </button>
    <plaid-link
      :env="plaidEnv"
      :publicKey="plaidPublicKey"
      clientName="budget"
      v-bind="{ onSuccess }"
    >
      Open Plaid Link
    </plaid-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'Dashboard',
    components: {
        PlaidLink,
    },
    data: () => ({
        plaidEnv: process.env.VUE_APP_PLAID_ENV,
        plaidPublicKey: process.env.VUE_APP_PLAID_PUBLIC_KEY,
    }),
    methods: {
        ...mapActions(['LOG_OUT_USER']),
        onClickLogOut() {
            this.LOG_OUT_USER().then(() => this.$router.push({ name: 'LogIn' }))
        },
        onSuccess(token) {
            console.log(token)
        },
    },
    metaInfo: {
        title: 'Dashboard',
    },
}
</script>
