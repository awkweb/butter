<template>
  <nav class="navbar">
      <ul class="navbar__section">
          <li>
              <router-link
                  :class="['navbar__item', {
                      'active': $route.name === 'Inbox',
                      'notification': true
                  }]"
                  :to="{ name: 'Inbox'}"
              >
                  Inbox
              </router-link>
          </li>
          <li>
              <router-link
                  :class="['navbar__item', {
                      'active': $route.name === 'Budgets'
                  }]"
                  :to="{ name: 'Budgets'}"
              >
                  Budgets
              </router-link>
          </li>
          <li>
              <router-link
                  :class="['navbar__item', {
                      'active': $route.name === 'Transactions'
                  }]"
                  :to="{ name: 'Transactions'}"
              >
                  Transactions
              </router-link>
          </li>
            <li>
              <router-link
                  :class="['navbar__item', {
                      'active': $route.name === 'Accounts'
                  }]"
                  :to="{ name: 'Accounts'}"
              >
                  Accounts
              </router-link>
          </li>
      </ul>

      <div class="navbar__section">
          <div>
              <div class="navbar__avatar">
                  <span>{{initial}}</span>
              </div>
              <div>
                  
              </div>
          </div>
      </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from '@/utils'

export default {
    name: 'Navbar',
    computed: {
        ...mapGetters(['user']),
        initial() {
            return (
                get(() => this.user.first_name[0]) ||
                get(() => this.user.email[0])
            )
        },
    },
    methods: {
        ...mapActions(['LOG_OUT_USER']),
        onClickLogOut() {
            this.LOG_OUT_USER().then(() => this.$router.push({ name: 'LogIn' }))
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.navbar {
    @include flex-row;
    background-color: color(default, background);
    border-bottom: {
        color: color(default, border, navbar);
        style: solid;
        width: 1px;
    }
    height: $navbar-height;
    justify-content: space-between;
    position: fixed;
    width: 100vw;
    z-index: $z-index-nav;
}

.navbar__section {
    @include flex-row;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.navbar__item {
    @include button;
    @include flex-row;
    align-items: center;
    color: color(default, font, copy);
    border: 0;
    display: flex;
    font-size: 0.8rem;
    height: 100%;
    padding: {
        left: 1rem;
        right: 1rem;
    }
    text-decoration: none;
    transition: {
        duration: $transition-duration;
        property: color;
    }

    &:hover {
        color: color(default, font);
    }

    &.active {
        color: color(default, font, primary);
        font-weight: 600;
        padding-top: 0.15rem;
    }
}

.navbar__avatar {
    @include flex-row;
    @include flex-center;
    background-color: color(default, background, primary);
    border: {
        color: darken(color(default, border, active), 5);
        radius: 50%;
        style: solid;
        width: 1px;
    }
    height: 2rem;
    width: 2rem;

    span {
        color: color(default, font, white);
        font: {
            size: 1.15rem;
            weight: 900;
        }
        margin-top: 0.15rem;
        text-transform: uppercase;
    }
}
</style>
