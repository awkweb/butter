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
    name: 'Inbox',
    components: {
        Dashboard,
        Loader,
    },
    data: () => ({
        loading: true,
    }),
    metaInfo: {
        title: 'Inbox',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';
</style>
