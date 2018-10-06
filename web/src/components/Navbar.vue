<template>
  <nav class="navbar">
      <button
          @click="onClickToggleDrawer"
          class="navbar__drawer hide-desktop"
      >
          <MenuIcon />
      </button>

      <ul
          class="navbar__section links"
      >
          <li>
              <router-link
                  :to="{ name: 'Inbox'}"
                  class="navbar__logo hide-mobile"
              >
              </router-link>
          </li>
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
          <div class="navbar__user">
              <div
                  @click="onClickToggleDropdown"
                  v-click-outside="onClickOutsideDropdown"
                  class="navbar__user-container"
              >
                  <div class="navbar__avatar">
                      <span>{{initial}}</span>
                  </div>
                  <div
                    v-if="user.first_name"
                    class="navbar__user-name"
                  >
                      {{user.first_name}}
                      <br>
                      {{user.email}}
                  </div>
                  <ChevronDownIcon/>
              </div>
              <ul
                  :class="['navbar__dropdown', {
                      'active': isDropDownOpen,
                  }]"
              >
                  <li class="navbar__dropdown-item">
                      <router-link :to="{ name: 'SettingsOverview'}">
                          Settings
                      </router-link>
                  </li>
                  <li class="navbar__dropdown-item">
                      <button @click="onClickLogOut">
                          Log Out
                      </button>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from '@/utils'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import MenuIcon from '@/assets/icons/menu.svg'
import XIcon from '@/assets/icons/x.svg'

export default {
    name: 'Navbar',
    components: {
        ChevronDownIcon,
        MenuIcon,
        XIcon,
    },
    data: () => ({
        isDrawerOpen: true,
        isDropDownOpen: false,
    }),
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
        onClickToggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen
        },
        onClickToggleDropdown() {
            this.isDropDownOpen = !this.isDropDownOpen
        },
        onClickOutsideDropdown() {
            if (this.isDropDownOpen) this.isDropDownOpen = false
        },
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
@import '../assets/styles/utils';

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

.navbar__drawer {
    @include button;
    border: 0;
    color: color(default, font, copy);
    margin: {
        left: 1rem;
        right: 1rem;
    }
    padding: 0;

    &:hover {
        color: color(default, font);
    }

    svg {
        width: 1.25rem;
        transition: {
            duration: $transition-duration;
            property: color;
        }
    }
}

.navbar__section {
    @include flex-row;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;

    &.links {
        @include respond-to(md) {
            @include flex-row;
        }
        display: none;
    }
}

.navbar__logo {
    @include button;
    height: 100%;
    padding: {
        left: 1rem;
        right: 1rem;
    }
    width: 3.95rem;
}

.navbar__item {
    @include button;
    @include flex-row;
    align-items: center;
    color: color(default, font, copy);
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

.navbar__user {
    position: relative;
    margin: {
        left: 1rem;
        right: 1rem;
    }
}

.navbar__user-container {
    @include flex-row;
    align-items: center;
    color: color(default, font, copy);
    cursor: pointer;
    transition: {
        duration: $transition-duration;
        property: color;
    }

    &:hover {
        color: color(default, font);

        .navbar__user-name {
            color: color(default, font);
        }
    }

    svg {
        margin-left: 0.3rem;
        width: 0.85rem;
        transition: {
            duration: $transition-duration;
            property: color;
        }
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
        @include respond-to(sm) {
            margin-top: 0.15rem;
        }
        color: color(default, font, white);
        font: {
            size: 1.15rem;
            weight: 900;
        }
        margin-top: 0.25rem;
        text-transform: uppercase;
    }
}

.navbar__user-name {
    @include respond-to(md) {
        display: block;
    }
    color: color(default, font, copy);
    display: none;
    font-size: 0.8rem;
    margin-left: 0.65rem;
    transition: {
        duration: $transition-duration;
        property: color;
    }
}

.navbar__dropdown {
    background-color: color(default, background);
    border: {
        color: color(default, border, dropdown);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    list-style-type: none;
    margin: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 2rem;
    transition: {
        duration: $transition-duration / 2;
        property: opacity, top;
    }
    width: 16rem;

    &.active {
        opacity: 1;
        pointer-events: all;
        top: 3rem;
    }
}

.navbar__dropdown-item {
    border-bottom: {
        color: color(default, border, dropdown);
        style: solid;
        width: 1px;
    }

    &:hover {
        background-color: color(default, background, dropdown);
    }

    &:first-child {
        border-top-right-radius: $border-radius;
        border-top-left-radius: $border-radius;
    }

    &:last-child {
        border-bottom: 0;
        border-bottom-right-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
    }

    a {
        display: block;
        text-decoration: none;
    }

    button {
        @include button;
        background-color: transparent;
        border: 0;
    }

    a,
    button {
        color: color(default, font);
        cursor: pointer;
        font-size: 0.8rem;
        padding: {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            top: 1rem;
        }
        text-align: left;
        width: 100%;
    }
}
</style>
