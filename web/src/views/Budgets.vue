<template>
  <Dashboard>
      <template slot="header">
          <div class="budgets__actions">
              <DatePicker
                  :initialDateOne="dateOne"
                  :initialDateTwo="dateTwo"
                  @handleOnClickApply="handleOnClickApply"
              />
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
                    <div class="label">Transactions</div>
                    <div>{{totalBudget.transactionCount}}</div>
                </div>
                <div class="budgets__total">
                    <div class="label">Remaining</div>
                    <div>${{totalBudget.budgeted - totalBudget.activity | prettyNumber}}</div>
                </div>
                <div class="budgets__total">
                    <div class="label">Activity</div>
                    <div>${{totalBudget.activity | prettyNumber}}</div>
                </div>
                <div class="budgets__total">
                    <div class="label">Budgeted</div>
                    <div>${{totalBudget.budgeted | prettyNumber}}</div>
                </div>
              </div>

              <BudgetTable
                  :budgets="budgets"
              />
          </template>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DatePicker from '@/components/DatePicker'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'

export default {
    name: 'Budgets',
    components: {
        BudgetTable: () => import('@/components/BudgetTable'),
        DatePicker,
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['budgets', 'dateOne', 'dateTwo']),
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
                    (total, budget) => total + budget.transaction_count,
                    0,
                ) || 0
            return {
                budgeted,
                activity,
                transactionCount,
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
        ...mapMutations(['SET_DATE_ONE', 'SET_DATE_TWO']),
        onClickNew() {
            alert('onClickNew')
        },
        async handleOnClickApply({ nextDateOne, nextDateTwo }) {
            this.SET_DATE_ONE(nextDateOne)
            this.SET_DATE_TWO(nextDateTwo)
            this.loading = true
            setTimeout(async () => {
                try {
                    await this.GET_BUDGETS()
                } finally {
                    this.loading = false
                }
            }, 500)
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
.budgets__actions {
    @include flex-row;
}

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

    .label {
        font-size: 0.9rem;
    }
}
</style>
