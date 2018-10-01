<template>
  <Dashboard>
      <Loader v-if="loading"/>
      <PlaidLink
          :env="plaidEnv"
          :publicKey="plaidPublicKey"
          clientName="budget"
          v-bind="{ onSuccess }"
      >
          Open Plaid Link
      </PlaidLink>
  </Dashboard>
</template>

<script>
import { mapActions } from 'vuex'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'Settings',
    components: {
        Dashboard,
        Loader,
        PlaidLink,
    },
    data: () => ({
        plaidEnv: process.env.VUE_APP_PLAID_ENV,
        plaidPublicKey: process.env.VUE_APP_PLAID_PUBLIC_KEY,
        loading: false,
    }),
    methods: {
        ...mapActions(['LINK_PLAID']),
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
        title: 'Settings',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
