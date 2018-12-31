<template>
    <Box
        bt
        borderColor="Gray8"
        :css="`
            overflow-x: scroll;
        `"
    >
        <StyledTable>
            <StyledTableHeader>
                <tr>
                    <th>&nbsp;</th>
                    <th>
                        <Tex
                            align="Right"
                            color="Gray2"
                            size="Xs"
                            weight="Bold"
                        >
                            Remaining
                        </Tex>
                    </th>
                    <th>
                        <Tex
                            align="Right"
                            color="Gray2"
                            size="Xs"
                            weight="Bold"
                        >
                            Spent
                        </Tex>
                    </th>
                    <th>
                        <Tex
                            align="Right"
                            color="Gray2"
                            size="Xs"
                            weight="Bold"
                        >
                            Budgeted
                        </Tex>
                    </th>
                </tr>
            </StyledTableHeader>
            <Draggable
                :options="draggableOptions"
                :value="budgets"
                element="tbody"
                @change="onDragChange($event)"
            >
                <TableRow
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
        </StyledTable>
    </Box>
</template>

<script>
import draggable from 'vuedraggable'
import { get } from '@/utils'
import Box from '@/components/core/layout/Box'
import Tex from '@/components/core/typography/Tex'
import TableRow from '../TableRow'
import { StyledTable, StyledTableHeader } from './styled-components'

export default {
    name: 'BudgetsTable',
    components: {
        Box,
        StyledTable,
        StyledTableHeader,
        TableRow,
        Tex,
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
            handle: '.handle',
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
