<template>
    <Grid
        maxWidth="Md"
        :ph="{ xs: 2, md: 12 }"
    >
        <Row>
            <Column :xs="12">
                <Navbar />
            </Column>
        </Row>

        <Row>
            <Column :xs="12">
                <Box
                    alignItems="Center"
                    display="Flex"
                    justifyContent="SpaceBetween"
                    :mv="3"
                >
                    <Tex
                        el="H1"
                        noMargin
                        size="Xxl"
                    >
                        Budgets
                    </Tex>
                    <Box>
                        <Button
                            color="Secondary"
                            :to="{ name: 'Budget', params: { id: 'new' } }"
                        >
                            Create Budget
                        </Button>
                    </Box>
                </Box>
            </Column>
        </Row>

        <Row>
            <Column
                v-if="loading"
                :xs="12"
            >
                <Loader v-if="loading" />
            </Column>
            <template v-else>
                <Column :xs="12">
                    <Box>
                        <Box
                            b
                            borderColor="Gray8"
                            cornerRadius="Small"
                            display="Flex"
                        >
                            <Box
                                alignItems="Center"
                                display="Flex"
                                br
                                borderColor="Gray8"
                                flexDirection="Column"
                                fluidWidth
                                :ph="3"
                                :pv="3"
                            >
                                <Box>
                                    <Tex size="Lg">
                                        ${{totalBudget.budgeted - totalBudget.activity | prettyNumber}}
                                    </Tex>
                                </Box>
                                <Box :mt="0.5">
                                    <Tex size="Sm">
                                        Remaining
                                    </Tex>
                                </Box>
                            </Box>
                            <Box
                                alignItems="Center"
                                display="Flex"
                                br
                                borderColor="Gray8"
                                flexDirection="Column"
                                fluidWidth
                                :ph="3"
                                :pv="3"
                            >
                                <Box>
                                    <Tex size="Lg">
                                        ${{totalBudget.activity | prettyNumber}}
                                    </Tex>
                                </Box>
                                <Box :mt="0.5">
                                    <Tex
                                        color="Gray1"
                                        size="Sm"
                                    >
                                        Spent
                                    </Tex>
                                </Box>
                            </Box>
                            <Box
                                alignItems="Center"
                                display="Flex"
                                flexDirection="Column"
                                fluidWidth
                                :ph="3"
                                :pv="3"
                            >
                                <Box>
                                    <Tex size="Lg">
                                        ${{totalBudget.budgeted | prettyNumber}}
                                    </Tex>
                                </Box>
                                <Box :mt="0.5">
                                    <Tex
                                        color="Gray1"
                                        size="Sm"
                                    >
                                        Budgeted
                                    </Tex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Column>

                <Column :xs="12">
                    <Box :mt="1">
                        <Table
                            :budgets="budgets"
                            @handleOnReorderBudgets="handleOnReorderBudgets"
                        />
                    </Box>
                </Column>
            </template>
        </Row>
    </Grid>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { get } from '@/utils'
import Box from '@/components/core/layout/Box'
import Button from '@/components/core/actions/Button'
import Column from '@/components/core/layout/Column'
import Grid from '@/components/core/layout/Grid'
import Row from '@/components/core/layout/Row'
import Tex from '@/components/core/typography/Tex'
import Navbar from '@/components/ui/Navbar'
import Loader from '@/components/core/indicators/Loader'
import Table from './components/Table'

export default {
    name: 'home',
    components: {
        Box,
        Button,
        Column,
        Grid,
        Row,
        Table,
        Tex,
        Navbar,
        Loader,
    },
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(['budgets', 'dateOne', 'dateTwo']),
        totalBudget() {
            const budgeted =
                this.budgets.reduce(
                    (total, budget) => total + budget.budgeted,
                    0,
                ) || 0
            const activity =
                this.budgets.reduce(
                    (total, budget) => total + budget.activity,
                    0,
                ) || 0
            return {
                budgeted,
                activity,
            }
        },
    },
    async created() {
        if (this.budgets.length) {
            return
        }
        this.loading = true
        try {
            await this.GET_BUDGETS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions(['GET_BUDGETS', 'REORDER_BUDGETS']),
        handleOnReorderBudgets(data) {
            this.REORDER_BUDGETS(data)
        },
    },
    metaInfo: {
        title: 'Budgets',
    },
}
</script>
