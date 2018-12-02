<template>
  <Dashboard>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
              <div>
                  <div>
                      <Dropdown
                          v-model="budget"
                          :options="options"
                          id="budget"
                          label="Budget"
                      />
                      <button
                          :disabled="!budget || checkedTransactions.length > 1"
                          @click="onClickAdd()"
                      >
                          Add
                      </button>
                  </div>
                  <div
                      v-for="transaction in transactions"
                  >
                      <input
                          v-model="checkedTransactions"
                          :value="transaction"
                          type="checkbox"
                          id="checkbox"
                      >
                      {{transaction.date}}
                      {{transaction.name}}
                      {{transaction.amount_cents | prettyNumber}}
                      <b v-show="transaction.new">new</b>
                  </div>
              </div>
          </template>
      </template>
  </Dashboard>
</template>

<script>
import api from '@/api'
import { get, toCents } from '@/utils'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown'
import Loader from '@/components/Loader'

export default {
    name: 'Inbox',
    components: {
        Dashboard,
        Dropdown,
        Loader,
    },
    data: () => ({
        loading: false,
        checkedTransactions: [],
        transactions: [],
        budget: undefined,
        options: [],
    }),
    async beforeRouteEnter(to, from, next) {
        const { data: budgets } = await api.getBudgets()
        next(vm => (vm.options = budgets))
    },
    async created() {
        try {
            this.loading = true
            const { data: transactions } = await api.fetchTransactions()
            this.transactions = transactions
        } catch (err) {
            console.log(err)
        } finally {
            this.loading = false
        }
    },
    methods: {
        async onClickAdd() {
            const transaction = this.checkedTransactions[0]
            console.log(transaction)
            const res = await api.updateTransaction(transaction.id, {
                budget: this.budget.id,
            })
            console.log(res)
            this.transactions = [
                ...this.transactions.filter(
                    t => t.transaction_id !== transaction.transaction_id,
                ),
            ]
        },
    },
    metaInfo: {
        title: 'Inbox',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
