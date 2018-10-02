<template>
  <div class="topbar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Topbar',
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.topbar {
    @include flex-row;
    align-items: center;
    background-color: color(default, background, primary);
    height: $navbar-height;
    width: calc(100vw - #{$navbar-width});
    left: $navbar-width;
    position: fixed;
    padding-right: 1rem;
    top: 0;
}
</style>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.topbar__button{
    @include button;
    @include flex-row;
    align-items: center;
    background: color(default, button, light);
    border: {
        radius: $border-radius;
        width: 0;
    }
    color: color(default, button, active);
    font: {
        size: 0.8rem;
        weight: 600;
    }
    height: 2rem;
    padding: {
        bottom: 0;
        left: 1rem;
        right: 1rem;
        top: 0;
    }

    &.budgets {
        margin-left: auto;
    }

    svg {
        margin-right: 0.5rem;
        width: 0.85rem;
    }

    span {
        padding-top: 0.25rem;
    }
}
</style>
