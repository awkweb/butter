<template>
  <Dashboard
    title="Settings"
  >
      <template slot="content">
          <nav class="tabnav">
              <router-link
                  :class="['tabnav__item', {
                      'active': $route.name === 'SettingsOverview',
                  }]"
                  :to="{ name: 'SettingsOverview' }"
              >
                  Overview
              </router-link>
              <router-link
                  :class="['tabnav__item', {
                      'active': $route.name === 'SettingsBilling',
                  }]"
                  :to="{ name: 'SettingsBilling' }"
              >
                  Billing
              </router-link>
          </nav>
          <router-view/>
      </template>
  </Dashboard>
</template>

<script>
export default {
    name: 'Settings',
    components: {
        Dashboard: () => import('../../layouts/Dashboard'),
    },
    metaInfo: {
        title: 'Settings',
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.tabnav {
    @include flex-row;
    align-items: center;
    border-bottom: {
        color: color(default, border, dropdown);
        style: solid;
        width: 1px;
    }
    height: 2.7rem;
    margin-bottom: 2rem;
}

.tabnav__item {
    color: color(default, font, secondary);
    font: {
        size: 0.9rem;
        weight: 600;
    }
    margin-right: 2rem;
    text-decoration: none;

    transition: {
        duration: $transition-duration;
        property: color;
    }

    &.active,
    &:hover {
        color: color(default, font, primary);
    }
}
</style>
