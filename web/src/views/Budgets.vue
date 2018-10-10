<template>
  <Dashboard>
      <template slot="header">
          <div>
              <button
                  @click="onClickNew"
                  class="dashboard__header-date"
              >
                  Oct 1 - 31
              </button>
              <button
                  @click="onClickNew"
                  class="dashboard__header-button"
              >
                  Create Budget
              </button>
          </div>
      </template>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
              <div class="budgets__totals">
                <div class="budgets__total">
                    <div>{{totalBudget.transactionCount}}</div>
                    <div>Transactions</div>
                </div>
                <div class="budgets__total">
                    <div>{{totalBudget.budgeted - totalBudget.activity | prettyNumber}}</div>
                    <div>Remaining</div>
                </div>
                <div class="budgets__total">
                    <div>{{totalBudget.activity | prettyNumber}}</div>
                    <div>Activity</div>
                </div>
                <div class="budgets__total">
                    <div>{{totalBudget.budgeted | prettyNumber}}</div>
                    <div>Budgeted</div>
                </div>
              </div>

              <Budget
                  v-for="budget in budgets"
                  :key="budget.id"
                  :id="budget.id"
                  :name="budget.name"
                  :budgeted="budget.budgeted"
                  :activity="budget.activity"
                  :remaining="budget.remaining"
                  :transactionCount="budget.transaction_count"
                  :creationDate="budget.date_created"
                  @handleOnClickDelete="handleOnClickDelete"
                  @handleOnEditDelete="handleOnEditDelete"
              />
          </template>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['budgets']),
        totalBudget() {
            const budgeted =
                this.budgets.reduce(
                    (total, budget) => total + budget.budgeted,
                    0,
                ) || 0
            const activity =
                this.budgets.reduce(
                    (total, budget) => total + budget.activity,
                    0,
                ) || 0
            const transactionCount =
                this.budgets.reduce(
                    (total, budget) => total + budget.transactionCount,
                    0,
                ) || 0
            return {
                name: 'October 2018',
                budgeted,
                activity,
                transactionCount,
                creationDate: subDays(new Date(), 3),
            }
        },
    },
    async created() {
        this.loading = true
        try {
            await this.GET_BUDGETS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions([
            'CREATE_BUDGET',
            'DELETE_BUDGET',
            'GET_BUDGETS',
            'UPDATE_BUDGET',
        ]),
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

.budgets__totals {
    @include flex-row;
    align-items: center;
    border: {
        color: color(default, border, navbar);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    height: 6rem;
    margin-bottom: 3rem;
}

.budgets__total {
    @include flex-column;
    align-items: center;
    border-right: {
        color: color(default, border, navbar);
        style: solid;
        width: 1px;
    }
    font-size: 1.25rem;
    height: 100%;
    justify-content: center;
    width: 100%;

    &:last-child {
        border-right: 0;
    }
}
</style>
