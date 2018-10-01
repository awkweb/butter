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
    background-color: color(default, background, primary);
    height: $navbar-height;
    width: calc(100vw - #{$navbar-width});
    left: $navbar-width;
    position: fixed;
    top: 0;
}
</style>
