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
    background-color: color(default, background);
    box-sizing: border-box;
    font: {
        family: $font-sans-serif;
        size: $font-size-root * 0.95;
    }
    text-rendering: optimizeLegibility;
}

body {
    @include page;
    margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 900;
    margin: 0;
}

a {
    color: color(default, font);
}

button {
    font-family: $font-sans-serif;
}

#app {
    min-height: 100vh;
}
</style>
