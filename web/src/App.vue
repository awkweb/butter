<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUserFromLocalStorage, isLoggedIn } from '@/utils'

export default {
    name: 'App',
    created() {
        if (isLoggedIn) {
            const user = getUserFromLocalStorage()
            this.SET_USER(user)
        }
    },
    methods: {
        ...mapMutations(['SET_USER']),
    },
    metaInfo: {
        titleTemplate: titleChunk => {
            return titleChunk ? `${titleChunk} | Wilbur` : 'Wilbur'
        },
    },
}
</script>

<style lang="scss">
@import 'assets/styles/partials/variables';
@import 'assets/styles/partials/functions';
@import 'assets/styles/partials/mixins';

html {
    @include respond-to(sm) {
        font-size: $font-size-root;
    }
    font-size: $font-size-root * 0.95;
}
</style>
