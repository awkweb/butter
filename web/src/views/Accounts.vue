<template>
  <Dashboard>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
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
        loading: false,
    }),
    metaInfo: {
        title: 'Connected Accounts',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
