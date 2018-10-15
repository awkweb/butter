<template>
  <table class="budget-table">
      <thead class="budget-table__header">
        <tr>
            <th>&nbsp;</th>
            <th>Last Activity</th>
            <th>Activity</th>
            <th>Remaining</th>
            <th>Budgeted</th>
            <th>Transactions</th>
            <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
          <BudgetRow
              v-for="budget in budgets"
              :key="budget.id"
              :id="budget.id"
              :name="budget.name"
              :budgeted="budget.budgeted"
              :activity="budget.activity"
              :remaining="budget.remaining"
              :transactionCount="budget.transaction_count"
              :creationDate="budget.date_created"
          />
      </tbody>
  </table>
</template>

<script>
import BudgetRow from '@/components/BudgetRow'

export default {
    name: 'BudgetTable',
    components: {
        BudgetRow,
    },
    props: {
        budgets: {
            default: () => [],
            type: Array,
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.budget-table {
    border: {
        collapse: separate;
        spacing: 0;
    }
    width: 100%;
    margin-bottom: 3rem;
}

.budget-table__header {
    background-color: #f2f2f2;

    th {
        border: {
            color: #dedddc;
            style: solid;
            width: 1px;
        }
        border-right: 0;
        border-left: 0;
        font: {
            size: 0.9rem;
            weight: 600;
        }
        padding: {
            bottom: 0.7rem;
            left: 1rem;
            right: 1rem;
            top: 1rem;
        }
        text-align: left;
        word-break: normal;
    }
}
</style>
