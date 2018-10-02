<template>
  <Dashboard>
      <Loader v-if="loading"/>
      <template v-else>
          <template slot="topbar">
              transactions
          </template>
          <template slot="content">
              shows all transactions in a filterable table
          </template>
      </template>
  </Dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'

export default {
    name: 'Transactions',
    components: {
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: true,
    }),
    metaInfo: {
        title: 'Transactions',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
