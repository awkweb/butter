<template>
    <Dashboard>
        <template slot="header">
            <div class="budgets__actions">
                <DatePicker
                    :initialDateOne="dateOne"
                    :initialDateTwo="dateTwo"
                    @handleOnClickApply="handleOnClickApply"
                >
                    <button
                        id="datepicker-trigger"
                        class="datepicker__anchor"
                    >{{formatDateRange(dateOne, dateTwo)}}</button>
                </DatePicker>

                <router-link
                    :to="{ name: 'Budget', params: { id: 'new' }}"
                    class="dashboard__header-button"
                >New Budget</router-link>
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

                <BudgetsTable :budgets="budgets" @handleOnReorderBudgets="handleOnReorderBudgets"/>
            </template>
        </template>
    </Dashboard>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { formatDateRange, get } from '@/utils'
import DatePicker from '@/components/forms/DatePicker'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/indicators/Loader'

export default {
    name: 'Budgets',
    components: {
        BudgetsTable: () => import('./components/BudgetsTable'),
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
        ...mapActions(['GET_BUDGETS', 'REORDER_BUDGETS']),
        ...mapMutations(['SET_DATE_ONE', 'SET_DATE_TWO']),
        formatDateRange,
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

.datepicker__anchor {
    @include button;
    background-color: #efeeea;
    border: {
        radius: $border-radius;
        width: 0;
    }
    font: {
        size: 0.8rem;
        weight: 600;
    }
    height: 2.5rem;
    margin-right: 1rem;
    padding: {
        bottom: 0;
        left: 1rem;
        right: 1rem;
        top: 0.25rem;
    }
    white-space: nowrap;
}
</style>
