<template>
    <StyledTableRow>
        <StyledTableRowName>
            <Box
                alignItems="Center"
                display="Flex"
                :css="`
                    a { text-decoration: none; }
                `"
            >
                <StyledIconContainer class="handle">
                    <MoreVerticalIcon />
                </StyledIconContainer>
                <Tex
                    color="Blue2"
                    size="Sm"
                    weight="SemiBold"
                >
                    <router-link
                        :to="{ name: 'Budget', params: { id: id, budget }}"
                        class="budgets-table-row__button"
                    >
                        {{name}}
                    </router-link>
                </Tex>
            </Box>
        </StyledTableRowName>

        <StyledTableData>
            <Tex
                align="Right"
                size="Sm"
            >${{remaining | prettyNumber}}</Tex>
        </StyledTableData>

        <StyledTableData>
            <Tex
                align="Right"
                size="Sm"
            >${{activity | prettyNumber}}</Tex>
        </StyledTableData>

        <StyledTableData>
            <Tex
                align="Right"
                size="Sm"
            >${{budgeted | prettyNumber}}</Tex>
        </StyledTableData>
    </StyledTableRow>
</template>

<script>
import MoreVerticalIcon from '@/assets/icons/more-vertical.svg'
import Box from '@/components/core/layout/Box'
import Tex from '@/components/core/typography/Tex'
import {
    StyledTableRow,
    StyledTableRowName,
    StyledTableData,
    StyledIconContainer,
} from './styled-components'

export default {
    name: 'TableRow',
    components: {
        Box,
        StyledIconContainer,
        MoreVerticalIcon,
        StyledTableData,
        StyledTableRow,
        StyledTableRowName,
        Tex,
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
