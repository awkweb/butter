<template>
  <Dashboard>
      <template slot="header">
          <button
              @click="onClickNew"
              class="dashboard__header-button"
          >
              Create Budget
          </button>
      </template>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
              <Budget
                  v-for="budget in budgets"
                  :key="budget.id"
                  :id="budget.id"
                  :name="budget.name"
                  :budgeted="budget.budgeted"
                  :activity="budget.activity"
                  :transactionCount="budget.transactionCount"
                  :creationDate="budget.creationDate"
                  @handleOnClickDelete="handleOnClickDelete"
                  @handleOnEditDelete="handleOnEditDelete"
              />
          </template>
      </template>
  </Dashboard>
</template>

<script>
import { subDays } from 'date-fns'
import Budget from '@/components/Budget'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'
import EditIcon from '@/assets/icons/edit.svg'

export default {
    name: 'Budgets',
    components: {
        Budget,
        Dashboard,
        EditIcon,
        Loader,
    },
    computed: {
        totalBudget() {
            const budgeted = this.budgets.reduce(
                (total, budget) => total + budget.budgeted,
                0,
            )
            const activity = this.budgets.reduce(
                (total, budget) => total + budget.activity,
                0,
            )
            return {
                name: 'October 2018',
                budgeted,
                activity,
                transactionCount: this.budgets.reduce(
                    (total, budget) => total + budget.transactionCount,
                    0,
                ),
                creationDate: subDays(new Date(), 3),
            }
        },
    },
    data: () => ({
        loading: false,
        budgets: [
            {
                id: 'asdfsdfadsf',
                name: 'Transportation',
                budgeted: 200,
                activity: 161.8,
                transactionCount: 25,
                creationDate: subDays(new Date(), 3),
            },
            {
                id: 'asdkkasdf',
                name: 'Dining Out',
                budgeted: 750,
                activity: 890.86,
                transactionCount: 41,
                creationDate: subDays(new Date(), 1),
            },
            {
                id: 'kasdfdsk',
                name: 'Groceries',
                budgeted: 500,
                activity: 174.61,
                transactionCount: 5,
                creationDate: subDays(new Date(), 6),
            },
            {
                id: 'lasdfnus',
                name: 'Phone',
                budgeted: 60,
                activity: 51.8,
                transactionCount: 1,
                creationDate: subDays(new Date(), 10),
            },
            {
                id: 'asdsadmmjah',
                name: 'One-Time Purchases',
                budgeted: 4000,
                activity: 4113.97,
                transactionCount: 24,
                creationDate: subDays(new Date(), 8),
            },
            {
                id: 'oaooooalal',
                name: 'Rent',
                budgeted: 2066.67,
                activity: 2066.67,
                transactionCount: 1,
                creationDate: subDays(new Date(), 20),
            },
            {
                id: 'pppplllala',
                name: 'Equinox',
                budgeted: 250,
                activity: 250,
                transactionCount: 1,
                creationDate: subDays(new Date(), 4),
            },
        ],
    }),
    methods: {
        onClickNew() {
            alert('onClickNew')
        },
        handleOnClickDelete(budgetId) {
            alert(`handleOnClickDelete ${budgetId}`)
        },
        handleOnEditDelete(budgetId) {
            alert(`handleOnEditDelete ${budgetId}`)
        },
    },
    metaInfo: {
        title: 'Budgets',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
