<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    metaInfo: {
        titleTemplate: titleChunk => {
            return titleChunk ? `${titleChunk} - Budget` : 'Budget'
        },
    },
}
</script>

<style lang="scss">
@import 'assets/styles/variables';
@import 'assets/styles/fonts';
@import 'assets/styles/functions';
@import 'assets/styles/mixins';

*,
*:before,
*:after {
    box-sizing: inherit;
}

html {
    @include respond-to(sm) {
        font-size: $font-size-root;
    }

    box-sizing: border-box;
    font: {
        family: $font-sans-serif;
        size: $font-size-root * 0.95;
    }
}

body {
    margin: 0;
    min-height: 100vh;
}

#app {
    min-height: 100vh;
}
</style>
