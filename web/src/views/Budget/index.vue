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
                        {{title}}
                    </Tex>
                </Box>
            </Column>
        </Row>

        <Row>
            <Column :xs="8">
                <Box
                    display="Flex"
                    el="Form"
                    flexDirection="Column"
                >
                    <Box
                        v-if="error"
                        :mt="3"
                    >
                        <Tex
                            color="Red3"
                            size="Sm"
                        >
                            {{ error }}
                        </Tex>
                    </Box>

                    <Box :mb="2">
                        <Field
                            v-model="name"
                            :error="nameError"
                            autofocus
                            id="name"
                            label="Name"
                        />
                    </Box>
                    <Box :mb="2">
                        <Field
                            v-model="amount"
                            :error="amountError"
                            id="amount"
                            label="Amount"
                            type="Number"
                        />
                    </Box>

                    <Box
                        display="Flex"
                        justifyContent="SpaceBetween"
                    >
                        <Box
                            alignItems="Center"
                            display="Flex"
                        >
                            <Button
                                v-if="isUpdatable"
                                color="Brand"
                                size="Lg"
                                :disabled="$v.validationGroup.$invalid || networkActive"
                                :isLoading="loading"
                                :onClick="onClickUpdate"
                            >
                                Update
                            </Button>
                            <Button
                                v-else
                                color="Brand"
                                size="Lg"
                                :disabled="$v.validationGroup.$invalid || networkActive"
                                :isLoading="loading"
                                :onClick="onClickCreate"
                            >
                                Create
                            </Button>
                            <Box :ml="3">
                                <Ref
                                    color="Gray4"
                                    size="Sm"
                                    :disabled="networkActive"
                                    :to="{ name: 'Home' }"
                                >
                                    Cancel
                                </Ref>
                            </Box>
                        </Box>

                        <Button
                            v-if="isUpdatable"
                            color="Error"
                            noBackground
                            size="Lg"
                            v-click-outside="resetDelete"
                            :disabled="networkActive"
                            :isLoading="deleting"
                            :onClick="onClickDelete"
                        >
                            {{ deleteButtonText }}
                        </Button>
                    </Box>
                </Box>
            </Column>
        </Row>
    </Grid>
</template>

<script>
import { mapActions } from 'vuex'
import { minValue, required } from 'vuelidate/lib/validators'
import { formatDateRange, get, toAmount, toCents } from '@/utils'
import api from '@/api'
import Box from '@/components/core/layout/Box'
import Button from '@/components/core/actions/Button'
import Column from '@/components/core/layout/Column'
import Field from '@/components/core/form/Field'
import Navbar from '@/components/ui/Navbar'
import Grid from '@/components/core/layout/Grid'
import Ref from '@/components/core/actions/Ref'
import Row from '@/components/core/layout/Row'
import Tex from '@/components/core/typography/Tex'

export default {
    name: 'Budget',
    components: {
        Box,
        Button,
        Column,
        Navbar,
        Field,
        Grid,
        Ref,
        Row,
        Tex,
    },
    props: {
        budget: {
            type: Object,
        },
        id: {
            type: String,
        },
    },
    data() {
        return {
            error: undefined,
            deleting: false,
            loading: false,
            amount: get(() => toAmount(this.budget.amount_cents)),
            name: get(() => this.budget.name),
            startDelete: false,
        }
    },
    computed: {
        amountError() {
            let error = undefined
            if (!this.$v.amount.required) {
                error = 'Amount is required'
            } else if (!this.$v.amount.minValue) {
                error = 'Amount must be positive'
            }
            return error
        },
        nameError() {
            let error = undefined
            if (!this.$v.name.required) {
                error = 'Name is required'
            }
            return error
        },
        deleteButtonText() {
            let text
            if (this.startDelete) {
                text = 'Really delete?'
            } else {
                text = 'Delete'
            }
            return text
        },
        isUpdatable() {
            return this.id !== 'new'
        },
        networkActive() {
            return this.loading || this.deleting
        },
        title() {
            if (this.isUpdatable) {
                return 'Update Budget'
            } else {
                return 'Create Budget'
            }
        },
    },
    async beforeRouteEnter(to, from, next) {
        const budgetId = get(() => to.params.id)
        if (budgetId === 'new') {
            next()
        } else {
            try {
                const res = await api.getBudget(budgetId)
                const budget = get(() => res.data)
                next(vm => vm.initData(budget))
            } catch (err) {
                next(vm => vm.$router.replace({ name: 'Home' }))
            }
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const budgetId = get(() => to.params.id)
        if (budgetId === 'new') {
            next()
        } else {
            try {
                const res = await api.getBudget(budgetId)
                const budget = get(() => res.data)
                this.initData(budget)
                next()
            } catch (err) {
                next(vm => vm.$router.replace({ name: 'Home' }))
            }
        }
    },
    methods: {
        ...mapActions(['CREATE_BUDGET', 'DELETE_BUDGET', 'UPDATE_BUDGET']),
        catchError(err) {
            let error
            if ('name' in err) {
                error = get(() => err.name[0])
            } else if ('amount_cents' in err) {
                error = get(() => err.amount_cents[0])
            }
            this.loading = false
            this.error = error
        },
        initData({ name, amount_cents }) {
            this.name = name
            this.amount = toAmount(amount_cents)
        },
        async onClickCreate() {
            try {
                this.error = undefined
                this.loading = true
                await this.CREATE_BUDGET({
                    name: this.name,
                    amount_cents: toCents(this.amount),
                })
                this.$router.push({ name: 'Home' })
            } catch (err) {
                this.catchError(err)
            }
        },
        async onClickDelete() {
            if (!this.startDelete) {
                this.startDelete = true
            } else {
                try {
                    this.error = undefined
                    this.deleting = true
                    await this.DELETE_BUDGET(this.id)
                    this.$router.push({ name: 'Home' })
                } catch (err) {
                    this.resetDelete()
                    this.catchError(err)
                }
            }
        },
        async onClickUpdate() {
            try {
                this.error = undefined
                this.loading = true
                const data = {
                    ...this.budget,
                    name: this.name,
                    amount_cents: toCents(this.amount),
                }
                await this.UPDATE_BUDGET({ budgetId: this.id, data })
                this.$router.push({ name: 'Home' })
            } catch (err) {
                this.catchError(err)
            }
        },
        resetDelete() {
            this.startDelete = false
            this.deleting = false
        },
    },
    validations: {
        amount: {
            required,
            minValue: minValue(0),
        },
        name: {
            required,
        },
        validationGroup: ['amount', 'name'],
    },
    metaInfo() {
        return {
            title: this.title,
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/partials/variables';
@import '../../assets/styles/partials/functions';
@import '../../assets/styles/partials/mixins';

.budgets-form__footer {
    @include flex-row;
    justify-content: space-between;
    border-top: {
        color: #dedddc;
        style: solid;
        width: 1px;
    }
    padding: 1rem;
}
</style>
