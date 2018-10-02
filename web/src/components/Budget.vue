<template>
  <div class="budget">
      <header class="budget__header">
          <div class="budget__name">{{name}}</div>
          <div class="budget__meter">
              <div
                  :style="{width: `${meterWidth}%`}"
                  class="budget__meter-bar"
              >
              </div>
          </div>
          <div class="budget__last">
              Last activity
              <router-link
                  :to="{ name: 'Transactions'}"
              >
                  {{creationDate | hoursAgo}}
              </router-link>
          </div>
      </header>

      <div class="budget__amounts">
          <div
              v-for="amount in amounts"
              :class="['budget__amount', {
                  'negative': isNegative(amount),
              }]"
          >
              <div class="budget__amount-number">
                  <span
                      v-if="isNegative(amount)"
                      class="integer"
                  >
                      -
                  </span>
                  <span class="integer">{{amount.integer | prettyNumber}}</span>
                  <span class="decimal">.{{amount.decimal}}</span>
              </div>
              <div class="budget__amount-type">{{amount.name}}</div>
          </div>

          <div class="budget__amount">
              <div class="budget__amount-number">
                  <span class="integer">{{transactionCount}}</span>
              </div>
              <div class="budget__amount-type">
                  {{transactionCount > 1 ? 'transactions' : 'transaction'}}
              </div>
          </div>
      </div>

      <div
          v-if="showActions"
          class="budget__actions"
      >
          <button
              @click="onClickEdit"
              class="budget__action"
          >
              <EditIcon/>
          </button>
          <button
              @click="onClickDelete"
              class="budget__action"
          >
              <DeleteIcon/>
          </button>
      </div>
  </div>
</template>

<script>
import DeleteIcon from '@/assets/icons/delete.svg'
import EditIcon from '@/assets/icons/edit.svg'

export default {
    name: 'Budget',
    components: {
        DeleteIcon,
        EditIcon,
    },
    props: {
        id: {
            type: String,
            required: false,
        },
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
        creationDate: {
            type: Date,
            required: true,
        },
        showActions: {
            type: Boolean,
            required: false,
            default: true,
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
                    name: 'remaining',
                    integer: this.removeDecimal(this.remaining),
                    decimal: this.removeInteger(this.remaining),
                },
                {
                    name: 'activity',
                    integer: this.removeDecimal(this.activity),
                    decimal: this.removeInteger(this.activity),
                },
                {
                    name: 'budgeted',
                    integer: this.removeDecimal(this.budgeted),
                    decimal: this.removeInteger(this.budgeted),
                },
            ]
        },
    },
    methods: {
        onClickEdit() {
            this.$emit('handleOnEditDelete', this.id)
        },
        onClickDelete() {
            this.$emit('handleOnClickDelete', this.id)
        },
        isNegative(amount) {
          return amount.name === 'remaining' && this.remaining < 0
        },
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
    @include flex-row;
    background-color: color(default, background);
    border: {
        color: color(default, border, navbar);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    height: 100%;
    min-height: 6rem;
    margin-bottom: 1rem;
    position: relative;
    transition: {
        duration: $transition-duration;
        property: border-color;
    }
    width: 100%;

    &:hover {
        border-color: color(default, border, hover);
        .budget__actions {
            display: block;
        }
    }

    &:last-child {
        margin-bottom: 0;
    }
}

.budget__header {
    @include flex-column;
    border-right: {
        color: color(default, border, light);
        style: solid;
        width: 1px;
    }
    height: 100%;
    justify-content: center;
    min-width: 18rem;
    padding: 1rem;
}

.budget__name {
    font: {
        size: 0.9rem;
        weight: 700;
    }
    margin-bottom: 0.5rem;
}

.budget__meter {
    background-color: lighten(color(default, border), 10);
    height: 5px;
    margin-bottom: 0.5rem;
    width: 100%;
}

.budget__meter-bar {
    background-color: darken(color(default, border), 10);
    height: 5px;
}

.budget__last {
    color: color(default, font, copy);
    font-size: 0.65rem;

    a {
        color: color(default, font, copy);
    }
}

.budget__amounts {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: {
        left: 2rem;
        right: 6rem;
    }
    width: 100%;
}

.budget__amount {
    @include flex-column;

    &.negative {
        .budget__amount-number {
            color: color(default, font, error);

            .decimal {
                color: lighten(color(default, font, error), 5);
            }
        }

        .budget__amount-type {
            color: lighten(color(default, font, error), 5);
        }
    }
}

.budget__amount-number {
    @include flex-row;

    .integer {
        font-size: 1.25rem;
    }

    .decimal {
        color: color(default, font, copy);
        font-size: 0.9rem;
        padding-top: 0.07rem;
    }
}

.budget__amount-type {
    color: color(default, font, copy);
    font-size: 0.6rem;
    text-transform: uppercase;
}

.budget__actions {
    display: none;
    position: absolute;
    right: 1rem;
    top: 1.75rem;
}

.budget__action {
    @include button;
    align-items: center;
    background-color: color(default, background);
    border: {
        color: color(default, border);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    display: inline-flex;
    height: 2rem;
    justify-content: center;
    margin-right: 0.5rem;
    transition: {
        duration: $transition-duration;
        property: background-color;
    }
    width: 2.5rem;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background-color: color(default, background, secondary);
    }

    svg {
        width: 0.85rem;
    }
}
</style>
