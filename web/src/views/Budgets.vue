<template>
  <Dashboard>
      <Loader v-if="loading"/>
      <template v-else>
          <template slot="topbar">
              merp
          </template>
          <template slot="content">
              meep
          </template>
      </template>
  </Dashboard>
</template>

<script>
import Budget from '@/components/Budget'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'

export default {
    name: 'Budgets',
    components: {
        Budget,
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: false,
        budgets: [
            {
                id: 1,
                name: 'Transportation',
                budgeted: 200,
                activity: 161.8,
                transactionCount: 25,
            },
            {
                id: 2,
                name: 'Dining Out',
                budgeted: 750,
                activity: 890.86,
                transactionCount: 41,
            },
            {
                id: 3,
                name: 'Groceries',
                budgeted: 500,
                activity: 174.61,
                transactionCount: 5,
            },
            {
                id: 4,
                name: 'Phone',
                budgeted: 60,
                activity: 51.8,
                transactionCount: 1,
            },
            {
                id: 5,
                name: 'One-Time Purchases',
                budgeted: 4000,
                activity: 4113.97,
                transactionCount: 24,
            },
            {
                id: 6,
                name: 'Rent',
                budgeted: 2066.67,
                activity: 2066.67,
                transactionCount: 1,
            },
            {
                id: 7,
                name: 'Equinox',
                budgeted: 250,
                activity: 250,
                transactionCount: 1,
            },
        ],
    }),
    metaInfo: {
        title: 'Budgets',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.budgets {
    @include flex-row;
    padding-top: 1.5rem;
}

.budgets__main {
    @include flex-row;
    flex: 7;
    flex-wrap: wrap;
    justify-content: space-between;
}

.budgets__sidebar {
    flex: 3;
}
</style>
