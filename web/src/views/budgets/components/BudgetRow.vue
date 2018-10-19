<template>
  <tr class="budget-row">
      <td class="budget-row__name">
          <div class="budget-row__container">
              <button
                  class="budget-row__reorder"
              >
                  <MoreVerticalIcon/>
              </button>
              <span>{{name}}</span>
          </div>
      </td>

      <td class="budget-row__data">
            <div class="budget-row__container">
                12 hours ago
            </div>
      </td>

      <td class="budget-row__data">
          <div class="budget-row__container">
              <span class="amount">${{activity | prettyNumber}}</span>
              <div class="budget-row__meter">
                  <div
                      :style="getMeterStyle(activity)"
                      class="budget-row__meter-bar"
                  >
                  </div>
              </div>
          </div>
      </td>

      <td class="budget-row__data">
          <div class="budget-row__container">
              <span class="amount">${{remaining | prettyNumber}}</span>
              <div class="budget-row__meter">
                  <div
                      :style="getMeterStyle(remaining)"
                      class="budget-row__meter-bar"
                  >
                  </div>
              </div>
          </div>
      </td>

      <td class="budget-row__data">
          <div class="budget-row__container">
              <span class="amount">${{budgeted | prettyNumber}}</span>
          </div>
      </td>

      <td class="budget-row__data">
            <div class="budget-row__container">
                {{transactionCount}}
            </div>
      </td>

      <td class="budget-row__data actions">
            <div class="budget-row__container">
                <button class="budget-row__button">Update</button>
            </div>
      </td>
  </tr>
</template>

<script>
import MoreVerticalIcon from '@/assets/icons/more-vertical.svg'
import EditIcon from '@/assets/icons/edit.svg'

export default {
    name: 'Budget',
    components: {
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
        remaining: {
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
    },
    methods: {
        getMeterStyle(amount) {
            const width = (amount / this.budgeted) * 100
            const radius = width === 100 ? '2px' : '0'
            return {
                width: width > 100 ? '100%' : `${width}%`,
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';

.budget-row {
    background-color: color(default, background);

    &.sortable-ghost {
        background-color: color(default, background, secondary);
        /*opacity: 0.5;*/
    }

    &.sortable-drag {
        td {
            border-bottom: 0;
        }

        .budget-row__reorder {
            cursor: grabbing;
        }
    }

    td {
        border-bottom: {
            color: #dedddc;
            style: solid;
            width: 1px;
        }
        font-size: 0.9rem;
        padding: {
            bottom: 0.85rem;
            top: 0.85rem;
        }
    }
}

.budget-row__container {
    @include flex-row;
    align-items: center;
}

.budget-row__reorder {
    @include button;
    @include flex-row;
    @include flex-center;
    background-color: transparent;
    border: 0;
    color: color(default, icon);
    cursor: grab;
    margin-right: 1rem;
    padding: 0;
    transition: {
        duration: $transition-duration;
        property: color;
    }

    &:hover {
        color: color(default, font);
    }

    svg {
        width: 1.25rem;
    }
}

.budget-row__name {
    border-right: {
        color: #f2f2f2;
        style: solid;
        width: 1px;
    }
    font-weight: 600;
    padding: {
        left: 0;
        right: 1rem;
    }

    span {
        margin-top: 0.25rem;
    }
}

.budget-row__data {
    min-width: 9rem;
    padding: {
        left: 1rem;
        right: 1rem;
    }

    &.actions {
        min-width: auto;
        padding-left: 0;
        padding-right: 0;
    }

    .amount {
        min-width: 3.4rem;
    }
}

.budget-row__meter {
    background-color: #f2f2f2;
    border-radius: $border-radius;
    height: 0.6rem;
    margin-left: 0.5rem;
    max-width: 3.3rem;
    width: 100%;
}

.budget-row__meter-bar {
    background: linear-gradient(to right, #24d09c, lighten(#24d09c, 10));
    border-bottom-left-radius: $border-radius;
    border-top-left-radius: $border-radius;
    height: 0.6rem;
}

.budget-row__button {
    @include button;
    background-color: #efeeea;
    border: {
        radius: $border-radius;
        width: 0;
    }
    color: #241c15;
    font: {
        size: 0.8rem;
        weight: 600;
    }
    height: 2rem;
    padding: {
        bottom: 0;
        left: 1rem;
        right: 1rem;
        top: 0.25rem;
    }
    text-align: left;
    transition: {
        duration: $transition-duration;
        property: background-color;
    }

    &:hover {
        background-color: #d9d7cd;
    }
}
</style>
