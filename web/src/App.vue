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
*,
*:before,
*:after {
    box-sizing: inherit;
}

html {
    box-sizing: border-box;
    font: {
        family: sans-serif;
        size: 18px;
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
