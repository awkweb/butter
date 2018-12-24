<template>
    <div class="box">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Box',
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/partials/variables';
@import '../../assets/styles/partials/functions';
@import '../../assets/styles/partials/mixins';

.box {
    @include flex-row;
    flex-wrap: wrap;
}
</style>
