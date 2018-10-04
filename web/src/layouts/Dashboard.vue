<template>
  <div class="dashboard">
      <Navbar/>
      <main class="dashboard__container">
          <div class="dashboard__content">
            <slot name="content"></slot>
          </div>
      </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { get, getUserFromLocalStorage, isLoggedIn } from '@/utils'
import Navbar from '@/components/Navbar'

export default {
    name: 'Dashboard',
    components: {
        Navbar,
    },
    created() {
        if (isLoggedIn) {
            const user = getUserFromLocalStorage()
            this.SET_USER(user)
        }
    },
    methods: {
        ...mapMutations(['SET_USER']),
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.dashboard {
    @include flex-row;
    @include page;
}

.dashboard__container {
    min-height: calc(100vh - #{$navbar-height});
    min-width: 100vw;
    padding-top: $navbar-height;
}

.dashboard__content {
    @include flex-column;

    padding: {
        bottom: 2rem;
        left: 3rem;
        right: 3rem;
        top: 2rem;
    }
}
</style>
