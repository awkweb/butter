<template>
  <div class="budgets">
      <Navbar/>
      <section class="budgets__container">
          <plaid-link
              :env="plaidEnv"
              :publicKey="plaidPublicKey"
              clientName="budget"
              v-bind="{ onSuccess }"
          >
              Open Plaid Link
          </plaid-link>
      </section>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { get, getUserFromLocalStorage, isLoggedIn } from '@/utils'
import Navbar from '@/components/Navbar'
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'Budgets',
    components: {
        Navbar,
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
        ...mapActions(['LINK_PLAID']),
        ...mapMutations(['SET_USER']),
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
        title: 'Budgets',
    },
}
</script>


<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.budgets {
    @include flex-column;
    @include page;
    background-color: color(default, background, secondary);
    align-items: center;
}

.budgets__container {
    padding: {
        bottom: 0.5rem;
        left: 4rem;
        right: 4rem;
        top: 0.75rem;
    }
    width: 100%;
}
</style>
