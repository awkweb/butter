<template>
  <div class="dashboard">
      <Navbar/>
      <main class="dashboard__container">
          <header class="dashboard__header">
              <h1 class="dashboard__title">
                  {{title || $route.name}}
              </h1>
              <slot name="header"/>
          </header>
          <slot name="content"/>
      </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'Dashboard',
    components: {
        Navbar,
    },
    props: {
        title: {
            type: String,
        },
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
    margin: {
        left: auto;
        right: auto;
        top: $navbar-height;
    }
    max-width: $container-max-width;
    padding: {
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
    }
    width: 100%;
}

.dashboard__header {
    @include flex-row;
    @include respond-to(md) {
        margin: {
            bottom: 3rem;
            top: 3rem;
        }
    }
    align-items: center;
    height: 2.5rem;
    justify-content: space-between;
    margin: {
        bottom: 2rem;
        top: 2rem;
    }
}
</style>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.dashboard__header-button {
    @include button;
    background-color: color(default, button, secondary);
    border: {
        radius: $border-radius;
        width: 0;
    }
    color: color(default, button, font);
    font: {
        size: 0.8rem;
        weight: 600;
    }
    height: 2.5rem;
    padding: {
        bottom: 0;
        left: 1rem;
        right: 1rem;
        top: 0.25rem;
    }
    transition: {
        duration: $transition-duration;
        property: background-color;
    }
    white-space: nowrap;

    &:hover {
        background-color: color(default, button);
    }
}
</style>
