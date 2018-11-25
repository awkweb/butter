<template>
  <Dashboard>
      <template slot="content">
          <PlaidLink
              :env="plaidEnv"
              :publicKey="plaidPublicKey"
              clientName="budget"
              v-bind="{ onSuccess }"
          >
              Connect Account
          </PlaidLink>
          <Loader
            v-if="loading"
          />
          <template v-else>
              <div>
                  <div
                      v-for="item in items"
                      :key="item.id"
                  >
                      {{item.institution.name}}
                      <button
                          @click="onClickDisconnect(item.id)"
                      >
                          Disconnect
                      </button>
                  </div>
              </div>
          </template>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'Accounts',
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
    computed: {
        ...mapGetters(['items']),
    },
    async created() {
        this.loading = true
        try {
            await this.GET_ITEMS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions(['DELETE_ITEM', 'GET_ITEMS', 'LINK_PLAID']),
        onSuccess(token, data) {
            console.log(token, data)
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
        async onClickDisconnect(itemId) {
            console.log(itemId)
            try {
                await this.DELETE_ITEM(itemId)
                console.log('success!')
            } catch (e) {
                console.log(e)
            }
        },
    },
    metaInfo: {
        title: 'Connected Accounts',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
