<template>
  <nav class="navbar">
      <header class="navbar__header">
          <router-link
              :to="{ name: 'Inbox'}"
              class="navbar__logo"
          >
              Matcha
          </router-link>
          <div class="navbar__user">
              {{user.email}}
          </div>
      </header>

      <div class="navbar__content">
          <ul class="navbar__section">
              <li>
                  <router-link
                      :class="['navbar__item', {
                          'active': $route.name === 'Inbox',
                          'notification': true
                      }]"
                      :to="{ name: 'Inbox'}"
                  >
                      <InboxIcon/>
                      <span>Inbox</span>
                  </router-link>
              </li>
          </ul>

          <ul class="navbar__section">
              <li>
                  <router-link
                      :class="['navbar__item', {
                          'active': $route.name === 'Budgets'
                      }]"
                      :to="{ name: 'Budgets'}"
                  >
                      <BudgetsIcon/>
                      <span>Budgets</span>
                  </router-link>
              </li>
              <li>
                  <router-link
                      :class="['navbar__item', {
                          'active': $route.name === 'Transactions'
                      }]"
                      :to="{ name: 'Transactions'}"
                  >
                      <TransactionsIcon/>
                      <span>Transactions</span>
                  </router-link>
              </li>
                <li>
                  <router-link
                      :class="['navbar__item', {
                          'active': $route.name === 'Accounts'
                      }]"
                      :to="{ name: 'Accounts'}"
                  >
                      <AccountsIcon/>
                      <span>Accounts</span>
                  </router-link>
              </li>
          </ul>

          <ul class="navbar__section">
              <li>
                  <router-link
                      :class="['navbar__item', {
                          'active': $route.name === 'Settings',
                      }]"
                      :to="{ name: 'Settings'}"
                  >
                      <SettingsIcon/>
                      <span>Settings</span>
                  </router-link>
              </li>
          </ul>

          <footer class="navbar__footer">
              <a
                  class="navbar__link"
              >
                  Support
              </a>
              <button
                  @click="onClickLogOut"
                  class="navbar__link"
              >
                  Log Out
              </button>
          </footer>
      </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountsIcon from '@/assets/icons/accounts.svg'
import BudgetsIcon from '@/assets/icons/budgets.svg'
import InboxIcon from '@/assets/icons/inbox.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import TransactionsIcon from '@/assets/icons/transactions.svg'

export default {
    name: 'Navbar',
    components: {
        AccountsIcon,
        BudgetsIcon,
        InboxIcon,
        SettingsIcon,
        TransactionsIcon,
    },
    computed: {
        ...mapGetters(['user']),
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
    background-color: color(default, background);
    height: 100vh;
    width: $navbar-width;
    position: relative;
}

.navbar__header {
    @include flex-column;
    background-color: color(default, background, primary);
    border-right: {
        color: darken(color(default, background, primary), 10);
        style: solid;
        width: 1px;
    }
    height: $navbar-height;
    justify-content: center;
    padding: {
        left: 1.25rem;
        top: 0.5rem;
    }
    position: fixed;
    width: $navbar-width;
}

.navbar__content {
    border-right: {
        color: #e0e6ed;
        style: solid;
        width: 1px;
    }
    height: 100vh;
    padding-top: 3.3rem;
}

.navbar__logo {
    color: color(default, font, white);
    font: {
        size: 0.7rem;
        weight: 600;
    }
    text-decoration: none;
}

.navbar__user {
    color: color(default, font, white);
    font-size: 0.7rem;
    opacity: 0.75;
}

.navbar__section {
    border-bottom: {
        color: #f1f5f9;
        style: solid;
        width: 1px;
    }
    margin: 0;
    padding: {
        bottom: 0.5rem;
        left: 0;
        top: 0.5rem;
    }

    &:last-child {
        border-bottom: 0;
        margin-bottom: 1rem;
    }
}

.navbar__item {
    align-items: center;
    color: color(default, font, copy);
    display: flex;
    font: {
        size: 0.8rem;
        weight: 600;
    }
    height: 2.75rem;
    padding: {
        left: 1.25rem;
        right: 1.25rem;
    }
    text-decoration: none;

    &.active {
        color: color(default, font, primary);
    }

    span {
        margin-top: 0.15rem;
    }

    svg {
        height: 1.15rem;
        margin-right: 1rem;
        width: 1.15rem;
    }
}

.navbar__footer {
    @include flex-column;
    padding: {
        bottom: 1.5rem;
        left: 1.25rem;
        top: 1.5rem;
    }
}

.navbar__link {
    color: color(default, font, copy);
    cursor: pointer;
    border: 0;
    font-size: 0.75rem;
    padding: 0;
    text-align: left;
    text-decoration: none;
    margin-bottom: 0.5rem;
    width: fit-content;

    &:hover {
        color: color(default, font, primary);
    }

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
