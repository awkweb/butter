<template>
  <tr class="budgets-table-row">
      <td class="budgets-table-row__name">
          <div class="budgets-table-row__container">
              <button
                  class="budgets-table-row__reorder"
              >
                  <MoreVerticalIcon/>
              </button>
              <span>{{name}}</span>
          </div>
      </td>

      <td class="budgets-table-row__data">
            <div class="budgets-table-row__container">
                12 hours ago
            </div>
      </td>

      <td class="budgets-table-row__data">
          <div class="budgets-table-row__container">
              ${{activity | prettyNumber}}
          </div>
      </td>

      <td class="budgets-table-row__data">
          <div class="budgets-table-row__container">
              ${{remaining | prettyNumber}}
          </div>
      </td>

      <td class="budgets-table-row__data">
          <div class="budgets-table-row__container">
              ${{budgeted | prettyNumber}}
          </div>
      </td>

      <td class="budgets-table-row__data">
            <div class="budgets-table-row__container">
                {{transactionCount}}
            </div>
      </td>

      <td class="budgets-table-row__data actions">
            <div class="budgets-table-row__container">
                <router-link
                    :to="{ name: 'Budgets', params: { id: id }}"
                    class="budgets-table-row__button"
                >
                    Update
                </router-link>
            </div>
      </td>
  </tr>
</template>

<script>
import MoreVerticalIcon from '@/assets/icons/more-vertical.svg'

export default {
    name: 'BudgetsTableRow',
    components: {
        MoreVerticalIcon,
    },
    props: {
        id: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        budget: {
            type: Object,
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
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';

.budgets-table-row {
    background-color: color(default, background);

    &.sortable-ghost {
        .budgets-table-row__container {
            opacity: 0.25;
        }
    }

    &.sortable-drag {
        td {
            border-bottom: 0;
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

.budgets-table-row__container {
    @include flex-row;
    align-items: center;
}

.budgets-table-row__reorder {
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

    svg {
        width: 1.25rem;
    }
}

.budgets-table-row__name {
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

.budgets-table-row__data {
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
}

.budgets-table-row__button {
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
