<template>
  <Dashboard>
      <template slot="header">
          <div>
              <router-link
                  :to="{ name: 'Transaction', params: { id: 'new' }}"
                  class="dashboard__header-button"
              >
                  New Transaction
              </router-link>
          </div>
      </template>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
              <div>
                <div
                    v-for="transaction in transactions"
                    :key="transaction.id"
                    class="transaction__row"
                >
                    <div>
                        <b>Date</b> {{transaction.date}}
                        <b>Name</b>
                        <router-link
                            :to="{ name: 'Transaction', params: { id: transaction.id, transaction }}"
                        >
                            {{transaction.name}}
                        </router-link>
                        <b>Amount</b> {{transaction.amount_cents | prettyNumber}}
                        <b>Budget</b> {{transaction.budget}}
                    </div>
                </div>
              </div>
          </template>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from '@/utils'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'

export default {
    name: 'Transactions',
    components: {
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['transactions']),
    },
    async created() {
        this.loading = true
        try {
            await this.GET_TRANSACTIONS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions(['GET_TRANSACTIONS']),
    },
    metaInfo: {
        title: 'Transactions',
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.transaction__row {
    @include flex-row;
    align-items: center;
}
</style>
