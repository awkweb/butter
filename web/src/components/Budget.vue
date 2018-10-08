<template>
  <div class="budget">
      <header class="budget__header">
          <button
              class="budget__reorder"
          >
              <MoreVerticalIcon/>
          </button>
          <div class="budget__name">{{name}}</div>
          <div class="budget__transaction-count">
              {{transactionCount}} {{transactionCount > 1 ? 'transactions' : 'transaction'}}
          </div>
          <div class="budget__meter">
              <div
                  :style="{width: `${meterWidth}%`}"
                  class="budget__meter-bar"
              >
              </div>
          </div>
      </header>

      <div class="budget__amounts">
          <div
              v-for="amount in amounts"
              :class="['budget__amount', {
                  'negative': amount.value < 0,
              }]"
          >
              <div class="budget__amount-number">
                  {{amount.value | prettyNumber}}
              </div>
              <div class="budget__amount-type">{{amount.name}}</div>
          </div>
      </div>

      <div class="budget__actions">
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
import MoreVerticalIcon from '@/assets/icons/more-vertical.svg'
import DeleteIcon from '@/assets/icons/delete.svg'
import EditIcon from '@/assets/icons/edit.svg'

export default {
    name: 'Budget',
    components: {
        DeleteIcon,
        EditIcon,
        MoreVerticalIcon,
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
                    name: 'Remaining',
                    value: this.remaining,
                },
                {
                    name: 'Activity',
                    value: this.activity,
                },
                {
                    name: 'Budgeted',
                    value: this.budgeted,
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
    border-top: {
        color: color(default, border, navbar);
        style: solid;
        width: 1px;
    }
    height: 6rem;
    width: 100%;

    &:last-child {
        border-bottom: {
            color: color(default, border, navbar);
            style: solid;
            width: 1px;
        }
        margin-bottom: 0;
    }
}

.budget__header {
    @include flex-column;
    height: 100%;
    justify-content: center;
    min-width: 18rem;
    padding: {
        left: 2.5rem;
        right: 1rem;
    }
    position: relative;
}

.budget__reorder {
    @include button;
    border: 0;
    color: color(default, icon);
    cursor: grab;
    padding: 0;
    left: 0;
    position: absolute;
    transition: {
        duration: $transition-duration;
        property: color;
    }
    top: 1rem;

    &:hover {
        color: color(default, font);
    }

    svg {
        width: 1.5rem;
    }
}

.budget__name {
    font-size: 1.1rem;
}

.budget__transaction-count {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
}

.budget__meter {
    background-color: #efeeea;
    height: 6px;
    width: 100%;
}

.budget__meter-bar {
    background-color: #24d09c;
    height: 6px;
}

.budget__amounts {
    @include flex-row;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: {
        left: 2rem;
        right: 2rem;
    }
    width: 100%;
}

.budget__amount {
    @include flex-column;
    margin-right: 2rem;
    width: 6rem;

    &.negative {
        color: color(default, font, error);
    }
}

.budget__amount-number {
    font-size: 1.25rem;
}

.budget__amount-type {
    font-size: 1rem;
}

.budget__actions {
    @include flex-row;
    align-items: center;
    padding-bottom: 0.5rem;
}

.budget__action {
    @include button;
    align-items: center;
    background-color: #efeeea;
    border: {
        radius: $border-radius;
        width: 0;
    }
    display: inline-flex;
    height: 2rem;
    justify-content: center;
    margin-right: 0.5rem;
    padding: {
        bottom: 0;
        left: 1.5rem;
        right: 1.5rem;
        top: 0;
    }
    transition: {
        duration: $transition-duration;
        property: background-color;
    }

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background-color: #d9d7cd;
    }

    svg {
        width: 0.85rem;
    }
}
</style>
