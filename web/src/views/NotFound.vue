<template>
    <div class="not-found">
        <h1>Something went wrong :(</h1>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    metaInfo: {
        title: 'Something went wrong',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.not-found {
    @include flex-row;
    @include flex-center;
    @include page;
}
</style>
