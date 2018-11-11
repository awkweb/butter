<template>
    <div class="budgets-table">
        <table class="budgets-table__table">
            <thead class="budgets-table__header">
                <tr>
                    <th>&nbsp;</th>
                    <th>Last Activity</th>
                    <th>Activity</th>
                    <th>Remaining</th>
                    <th>Budgeted</th>
                    <th>Transactions</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <Draggable
                :options="draggableOptions"
                :value="budgets"
                element="tbody"
                @change="onDragChange($event)"
            >
                <BudgetsTableRow
                    v-for="budget in budgets"
                    :key="budget.id"
                    :id="budget.id"
                    :name="budget.name"
                    :budget="budget"
                    :budgeted="budget.budgeted"
                    :activity="budget.activity"
                    :remaining="budget.remaining"
                    :transactionCount="budget.transaction_count"
                    :creationDate="budget.date_created"
                />
            </Draggable>
        </table>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { get } from '@/utils'
import BudgetsTableRow from './BudgetsTableRow'

export default {
    name: 'BudgetsTable',
    components: {
        BudgetsTableRow,
        Draggable: draggable,
    },
    props: {
        budgets: {
            default: () => [],
            type: Array,
        },
    },
    data: () => ({
        draggableOptions: {
            handle: '.budgets-table-row__reorder',
        },
    }),
    methods: {
        onDragChange(event) {
            const moved = event.moved
            const data = {
                budgetId: moved.element.id,
                newIndex: moved.newIndex,
                oldIndex: moved.oldIndex,
            }
            this.$emit('handleOnReorderBudgets', data)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';

.budgets-table {
    overflow-x: scroll;
    margin-bottom: 3rem;
}

.budgets-table__table {
    border: {
        collapse: separate;
        spacing: 0;
    }
    width: 100%;
}

.budgets-table__header {
    background-color: #f2f2f2;

    th {
        border: {
            color: #dedddc;
            style: solid;
            width: 1px;
        }
        border-right: 0;
        border-left: 0;
        font: {
            size: 0.9rem;
            weight: 600;
        }
        padding: {
            bottom: 0.7rem;
            left: 1rem;
            right: 1rem;
            top: 1rem;
        }
        text-align: left;
        word-break: normal;
    }
}
</style>
