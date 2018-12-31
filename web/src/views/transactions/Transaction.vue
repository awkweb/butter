<template>
    <div :title="title">
        <template slot="content">
            <form class="transactions-form">
                <div
                    v-if="error"
                    class="auth__error"
                >{{ error }}</div>
                <div class="transactions-form__fields">
                    <Field
                        v-model="name"
                        :error="nameError"
                        autofocus
                        id="name"
                        label="Name"
                    />
                    <Field
                        v-model="amount"
                        :error="amountError"
                        id="amount"
                        label="Amount"
                        type="number"
                    />
                    <Dropdown
                        v-model="budget"
                        :error="budgetError"
                        :options="options"
                        id="budget"
                        label="Budget"
                    />
                    <DatePicker
                        :initialDateOne="date"
                        mode="single"
                        :monthsToShow="1"
                        @handleOnSelectDate="handleOnSelectDate"
                    >
                        <Field
                            id="datepicker-trigger"
                            label="Date"
                            type="text"
                            :value="date"
                        />
                    </DatePicker>
                    <Field
                        v-model="note"
                        id="note"
                        label="Note"
                        type="textarea"
                    />
                </div>
                <div class="transactions-form__footer">
                    <div>
                        <router-link
                            :disabled="networkActive"
                            :to="{ name: 'Transactions' }"
                        >Cancel</router-link>
                        <button
                            v-if="isUpdatable"
                            :disabled="$v.validationGroup.$invalid || networkActive"
                            type="submit"
                            @click.prevent="onClickUpdate"
                            @keyup.enter="onClickUpdate"
                        >{{ loading ? 'Updating...' : 'Update' }}</button>
                        <button
                            v-else
                            :disabled="$v.validationGroup.$invalid || networkActive"
                            @click.prevent="onClickCreate"
                            @keyup.enter="onClickCreate"
                        >{{ loading ? 'Creating...' : 'Create' }}</button>
                    </div>

                    <button
                        v-if="isUpdatable"
                        v-click-outside="resetDelete"
                        :disabled="networkActive"
                        @click.prevent="onClickDelete"
                    >{{ deleteButtonText }}</button>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'
import { minValue, required } from 'vuelidate/lib/validators'
import { formatDateRange, get, toAmount, toCents } from '@/utils'
import api from '@/api'
import DatePicker from '@/components/other/DatePicker'
import Dropdown from '@/components/core/form/Dropdown'
import Field from '@/components/core/form/Field'

export default {
    name: 'Transaction',
    components: {
        DatePicker,
        Dropdown,
        Field,
    },
    props: {
        transaction: {
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
            amount: get(() => toAmount(this.transaction.amount_cents)),
            name: get(() => this.transaction.name),
            date:
                get(() => this.transaction.date_created) ||
                format(new Date(), 'YYYY-MM-DD'),
            note: get(() => this.transaction.note),
            budget: undefined,
            startDelete: false,
            options: [],
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
        budgetError() {
            let error = undefined
            if (!this.$v.budget.required) {
                error = 'Budget is required'
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
            if (this.deleting) {
                text = 'Deleting...'
            } else if (this.startDelete) {
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
                return 'Update Transaction'
            } else {
                return 'New Transaction'
            }
        },
    },
    async beforeRouteEnter(to, from, next) {
        const { data: budgets } = await api.getBudgets()
        const transactionId = get(() => to.params.id)
        if (transactionId === 'new') {
            next(vm => (vm.options = budgets))
        } else {
            try {
                const { data: transaction } = await api.getTransaction(
                    transactionId,
                )
                next(vm => {
                    vm.options = budgets
                    vm.initData(transaction, budgets)
                })
            } catch (err) {
                next(vm => vm.$router.replace({ name: 'Transactions' }))
            }
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const { data: budgets } = await api.getBudgets()
        const transactionId = get(() => to.params.id)
        if (transactionId === 'new') {
            this.options = budgets
            next()
        } else {
            try {
                const { data: transaction } = await api.getTransaction(
                    transactionId,
                )
                this.options = budgets
                this.initData(transaction, budgets)
                next()
            } catch (err) {
                next(vm => vm.$router.replace({ name: 'Transactions' }))
            }
        }
    },
    methods: {
        ...mapActions([
            'CREATE_TRANSACTION',
            'DELETE_TRANSACTION',
            'UPDATE_TRANSACTION',
        ]),
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
        initData({ name, amount_cents, budget, date, note }, budgets) {
            this.name = name
            this.amount = toAmount(amount_cents)
            this.date = date
            this.note = note
            this.budget = budgets.find(b => b.id === budget)
        },
        async onClickCreate() {
            try {
                this.error = undefined
                this.loading = true
                const data = {
                    name: this.name,
                    amount_cents: toCents(this.amount),
                    budget: this.budget.id,
                    date: this.date,
                    note: this.note,
                }
                await this.CREATE_TRANSACTION(data)
                this.$router.push({ name: 'Transactions' })
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
                    await this.DELETE_TRANSACTION(this.id)
                    this.$router.push({ name: 'Transactions' })
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
                    ...this.transaction,
                    name: this.name,
                    amount_cents: toCents(this.amount),
                    budget: this.budget.id,
                    date: this.date,
                    note: this.note,
                }
                await this.UPDATE_TRANSACTION({ transactionId: this.id, data })
                this.$router.push({ name: 'Transactions' })
            } catch (err) {
                this.catchError(err)
            }
        },
        resetDelete() {
            this.startDelete = false
            this.deleting = false
        },
        handleOnSelectDate(date) {
            this.date = date
        },
    },
    validations: {
        amount: {
            required,
            minValue: minValue(0),
        },
        budget: {
            required,
        },
        name: {
            required,
        },
        validationGroup: ['amount', 'budget', 'name'],
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
