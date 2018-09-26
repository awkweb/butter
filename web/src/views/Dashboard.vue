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
import { mapActions, mapMutations } from 'vuex'
import { get, getUserFromLocalStorage, isLoggedIn } from '@/utils'
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
    created() {
        if (isLoggedIn) {
            const user = getUserFromLocalStorage()
            this.SET_USER(user)
        }
    },
    methods: {
        ...mapActions(['LINK_PLAID', 'LOG_OUT_USER']),
        ...mapMutations(['SET_USER']),
        onClickLogOut() {
            this.LOG_OUT_USER().then(() => this.$router.push({ name: 'LogIn' }))
        },
        onSuccess(token, data) {
            const { accounts, institution } = data
            this.LINK_PLAID({
                institution,
                token,
                accounts: accounts.map(account => ({
                    ...account,
                    account_id: account.id,
                })),
            })
        },
    },
    metaInfo: {
        title: 'Dashboard',
    },
}
</script>
