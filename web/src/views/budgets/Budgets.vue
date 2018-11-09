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

              <BudgetsTable
                  :budgets="budgets"
                  @handleOnReorderBudgets="handleOnReorderBudgets"
              />
          </template>
          <Modal
              v-if="isModalOpen"
              v-scroll-lock="isModalOpen"
              :title="modalTitle"
              @handleOnCloseModal="handleOnCloseModal"
          >
              <div slot="content">
                  <BudgetsForm/>
              </div>
              <div slot="footer">
                  <BudgetsFormFooter
                      @handleOnClickCancel="handleOnCloseModal"
                  />
              </div>
          </Modal>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DatePicker from '@/components/DatePicker'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'

export default {
    name: 'Budgets',
    components: {
        BudgetsForm: () => import('./components/BudgetsForm'),
        BudgetsFormFooter: () => import('./components/BudgetsFormFooter'),
        BudgetsTable: () => import('./components/BudgetsTable'),
        DatePicker,
        Dashboard,
        Loader,
        Modal,
    },
    data: () => ({
        isModalOpen: false,
        loading: false,
        modalTitle: '',
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
            'REORDER_BUDGETS',
            'UPDATE_BUDGET',
        ]),
        ...mapMutations(['SET_DATE_ONE', 'SET_DATE_TWO']),
        onClickNew() {
            this.isModalOpen = true
            this.modalTitle = 'Create Budget'
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
        handleOnReorderBudgets(data) {
            this.REORDER_BUDGETS(data)
        },
        handleOnCloseModal() {
            this.isModalOpen = false
        },
    },
    metaInfo: {
        title: 'Budgets',
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.budgets__actions {
    @include flex-row;
}

.budgets__totals {
    @include respond-to(md) {
        @include flex-row;
        height: 6rem;
    }
    @include flex-column;
    align-items: center;
    border: {
        color: color(default, border, navbar);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    margin-bottom: 3rem;
}

.budgets__total {
    @include respond-to(md) {
        border-right: {
            color: color(default, border, navbar);
            style: solid;
            width: 1px;
        }
        border-bottom: 0;
        height: 100%;
        padding: 0;
    }
    @include flex-column;
    align-items: center;
    border-bottom: {
        color: color(default, border, navbar);
        style: solid;
        width: 1px;
    }
    font-size: 1.25rem;
    justify-content: center;
    padding: 1rem;
    width: 100%;

    &:last-child {
        border: 0;
    }

    .label {
        font-size: 0.9rem;
    }
}
</style>
