<template>
  <nav class="navbar">
      <div class="navbar__container">
          <router-link
              :to="{ name: 'Budgets'}"
              class="navbar__logo"
          >
            Matcha
          </router-link>

          <div class="navbar__center">
              <router-link
                  :class="['navbar__link', {
                      'active': $route.name === 'Budgets'
                  }]"
                  :to="{ name: 'Budgets'}"
              >
                Budgets
              </router-link>
              <router-link
                  :class="['navbar__link', {
                      'active': $route.name === 'Transactions'
                  }]"
                  :to="{ name: 'Budgets'}"
              >
                Transactions
              </router-link>
              <router-link
                  :class="['navbar__link', {
                      'active': $route.name === 'Inbox',
                      'notification': true
                  }]"
                  :to="{ name: 'Budgets'}"
              >
                Inbox
              </router-link>
          </div>

          <div class="navbar__right">
              <router-link
                  :class="['navbar__link', {
                      'active': $route.name === 'Settings',
                  }]"
                  :to="{ name: 'Budgets'}"
              >
                Settings
              </router-link>
              <button
                @click="onClickLogOut"
                class="navbar__link"
              >
                  Log Out
              </button>
          </div>
      </div>
      <div class="navbar__actions">
          <div class="navbar__title">
              {{$route.name}}
          </div>
          <div class="navbar__search">
              <SearchIcon/>
              <input
                  class="navbar__search-input"
                  placeholder="Search for transactions"
                  spellcheck="false"
                  type="text"
              />
          </div>
      </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
import SearchIcon from '@/assets/icons/search.svg'

export default {
    name: 'Navbar',
    components: {
        SearchIcon,
    },
    methods: {
        ...mapActions(['LOG_OUT_USER']),
        onClickLogOut() {
            this.LOG_OUT_USER().then(() => this.$router.push({ name: 'LogIn' }))
        },
    },
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.navbar {
    @include flex-column;
    align-items: center;
    background-color: color(default, background);
    padding: {
        bottom: 0.5rem;
        left: 4rem;
        right: 4rem;
        top: 0.75rem;
    }
    width: 100%;
}

.navbar__container {
    @include flex-row;
    align-items: center;
    border-bottom: {
        color: color(default, border);
        style: solid;
        width: 1px;
    }
    height: 2rem;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    max-width: $container-width;
    width: 100%;
}

.navbar__logo {
    font: {
        size: 1rem;
        weight: 900;
    }
    text-decoration: none;
}

.navbar__logo,
.navbar__right {
    width: 10rem;
}

.navbar__center {
    .navbar__link {
        margin-right: 3rem;
    }
}

.navbar__right {
    @include flex-row;
    justify-content: flex-end;
}

.navbar__link {
    color: color(default, font, secondary);
    display: inline-block;
    font-size: 0.8rem;
    margin-right: 2rem;
    line-height: 2rem;
    text-decoration: none;

    + button {
        @include button;
        color: color(default, font, secondary);
        background-color: transparent;
        border: 0;
        font-family: $font-sans-serif;
        padding: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    &.active {
        color: color(default, font);
        border-bottom: {
            color: color(default, border, active);
            style: solid;
            width: 1px;
        }
        font-weight: 600;
    }

    &.notification {
        position: relative;
        &::after {
            background-color: color(default, button, active);
            border-radius: 50%;
            display: block;
            content: '';
            height: 7px;
            position: absolute;
            right: -8px;
            top: 5px;
            width: 7px;
        }
    }
}

.navbar__actions {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    max-width: $container-width;
    width: 100%;
}

.navbar__title {
    font-size: 0.95rem;
}

.navbar__search {
    position: relative;
    svg {
        height: 0.95rem;
        left: 0.4rem;
        position: absolute;
        stroke: color(default, icon);
        top: 0.4rem;
        width: 0.95rem;
    }
}

.navbar__search-input {
    border: {
        color: color(default, border);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    color: color(default, font);
    font: {
        family: $font-sans-serif;
        size: 0.8rem;
    }
    height: 1.75rem;
    outline: 0;
    padding: {
        bottom: 0;
        left: 1.5rem;
        right: 0;
        top: 0.15rem;
    }
    transition: {
        duration: $transition-duration;
        property: border-color;
    }
    width: 12rem;

    &::-webkit-input-placeholder {
        color: color(default, font, placeholder);
    }

    &:focus {
        border-color: color(default, border, active);
    }
}
</style>
