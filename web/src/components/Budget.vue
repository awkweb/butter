<template>
  <div class="budget">
      <div class="budget__name">{{name}}</div>

      <div class="budget__amounts">
          <div
              v-for="amount in amounts"
              class="budget__amount"
          >
              <div class="budget__amount-number">
                  <span
                      v-if="amount.name === 'remaining' && remaining < 0"
                      class="negative"
                  >
                      (
                  </span>
                  <span class="integer">{{amount.integer | prettyNumber}}</span>
                  <span class="decimal">.{{amount.decimal}}</span>
                  <span
                      v-if="amount.name === 'remaining' && remaining < 0"
                      class="negative"
                  >
                      )
                  </span>
              </div>
              <div class="budget__amount-type">{{amount.name}}</div>
          </div>
      </div>

      <div class="budget__meter">
          <div
              :style="{width: `${meterWidth}%`}"
              class="budget__meter-bar"
          >
          </div>
      </div>

      <div class="budget__actions">
          <router-link :to="{ name: 'Budgets'}">View {{transactionCount}} transactions</router-link>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Budget',
    props: {
        name: {
            type: String,
            required: true,
        },
        budgeted: {
            type: Number,
            required: true,
        },
        activity: {
            type: Number,
            required: true,
        },
        transactionCount: {
            type: Number,
            required: true,
        },
    },
    computed: {
        meterWidth() {
            const width = (this.activity / this.budgeted) * 100
            return width > 100 ? 100 : width
        },
        remaining() {
            return this.budgeted - this.activity
        },
        amounts() {
            return [
                {
                    name: 'budgeted',
                    integer: this.removeDecimal(this.budgeted),
                    decimal: this.removeInteger(this.budgeted),
                },
                {
                    name: 'activity',
                    integer: this.removeDecimal(this.activity),
                    decimal: this.removeInteger(this.activity),
                },
                {
                    name: 'remaining',
                    integer: this.removeDecimal(this.remaining),
                    decimal: this.removeInteger(this.remaining),
                },
            ]
        },
    },
    methods: {
        removeDecimal(number) {
            return (
                Math.abs(number)
                    .toString()
                    .split('.')[0] || '0'
            )
        },
        removeInteger(number) {
            return (
                number
                    .toFixed(2)
                    .toString()
                    .split('.')[1] || '00'
            )
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.budget {
    background-color: color(default, background);
    border: {
        color: color(default, border);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    margin-bottom: 1.5rem;
    max-width: 24.5rem;
    padding: 2rem;
    width: 100%;
}

.budget__name {
    font: {
        size: 1rem;
        weight: 700;
    }
    margin-bottom: 1rem;
}

.budget__amounts {
    @include flex-row;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.budget__amount {
    @include flex-column;
}

.budget__amount-number {
    @include flex-row;
    .integer,
    .negative {
        font-size: 1.5rem;
    }

    .negative {
        color: color(default, font, secondary);
    }

    .decimal {
        color: color(default, font, copy);
        font-size: 0.9rem;
        padding-top: 0.25rem;
    }
}

.budget__amount-type {
    color: color(default, font, copy);
    font-size: 0.6rem;
    text-transform: uppercase;
}

.budget__meter {
    background-color: lighten(color(default, border), 10);
    height: 5px;
    margin-bottom: 0.5rem;
    width: 100%;
}

.budget__meter-bar {
    background-color: color(default, border, active);
    height: 5px;
}

.budget__actions {
    @include flex-row;
    font-size: 0.75rem;
    justify-content: space-between;
    a {
        color: color(default, font, copy);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
