<template>
  <Dashboard>
      <Loader v-if="loading"/>
      <template v-else>
          <template slot="topbar">
              accounts
          </template>
          <template slot="content">
              shows all the accounts that are linked and their transactions grouped by day
          </template>
      </template>
  </Dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'

export default {
    name: 'Accounts',
    components: {
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: true,
    }),
    metaInfo: {
        title: 'Accounts',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
