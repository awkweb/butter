<template>
    <form class="budgets-form">
        <div
            v-if="error"
            class="auth__error"
        >
            {{ error }}
        </div>
        <div class="budgets-form__fields">
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
                :options="options"
                id="budget"
                label="Budget"
            />
            <DatePicker
                :initialDateOne="date"
                mode="single"
                :monthsToShow="1"
                @handleOnClickApply="handleOnClickApply"
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
        <div class="budgets-form__footer">
            <button
                v-if="transaction"
                v-click-outside="resetDelete"
                :disabled="networkActive"
                @click.prevent="onClickDelete"
            >
                {{ deleteButtonText }}
            </button>

            <div class="">
                <button
                    :disabled="networkActive"
                    @click.prevent="onClickCancel"
                >
                    Cancel
                </button>
                <button
                    v-if="transaction"
                    :disabled="$v.validationGroup.$invalid || networkActive"
                    @click.prevent="onClickUpdate"
                    @keyup.enter="onClickCreate"
                >
                    {{ loading ? 'Updating...' : 'Update' }}
                </button>
                <button
                    v-else
                    :disabled="$v.validationGroup.$invalid || networkActive"
                    @click.prevent="onClickCreate"
                    @keyup.enter="onClickCreate"
                >
                    {{ loading ? 'Creating...' : 'Create' }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
import { format } from 'date-fns'
import { minValue, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import DatePicker from '@/components/DatePicker'
import Dropdown from '@/components/Dropdown'
import Field from '@/components/Field'

export default {
    name: 'TransactionsForm',
    props: {
        transaction: {
            type: Object,
        },
    },
    data() {
        return {
            error: null,
            deleting: false,
            loading: false,
            amount: get(() => this.transaction.amount) || null,
            name: get(() => this.transaction.name) || null,
            date:
                get(() => this.transaction.date_created) ||
                format(new Date(), 'YYYY-MM-DD'),
            note: get(() => this.transaction.note) || null,
            budget: get(() => this.transaction.budget) || null,
            startDelete: false,
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP' },
                { name: 'Phoenix', language: 'Elixir' },
            ],
        }
    },
    components: {
        DatePicker,
        Dropdown,
        Field,
    },
    computed: {
        amountError() {
            let error = null
            if (!this.$v.amount.required) {
                error = 'Amount is required'
            } else if (!this.$v.amount.minValue) {
                error = 'Amount must be positive'
            }
            return error
        },
        nameError() {
            let error = null
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
        networkActive() {
            return this.loading || this.deleting
        },
    },
    methods: {
        ...mapActions(['CREATE_BUDGET', 'DELETE_BUDGET', 'UPDATE_BUDGET']),
        catchError(err) {
            let error
            if ('name' in err) {
                error = get(() => err.name[0])
            } else if ('amount' in err) {
                error = get(() => err.amount[0])
            }
            this.loading = false
            this.error = error
        },
        onClickCancel() {
            this.$emit('handleOnCloseModal')
        },
        async onClickCreate() {
            this.error = null
            this.loading = true
            try {
                await this.CREATE_BUDGET({
                    name: this.name,
                    amount: this.amount,
                })
                this.$emit('handleOnCloseModal')
            } catch (err) {
                this.catchError(err)
            }
        },
        async onClickDelete() {
            if (!this.startDelete) {
                this.startDelete = true
            } else {
                this.error = null
                this.deleting = true
                try {
                    const budgetId = get(() => this.budget.id)
                    await this.DELETE_BUDGET(budgetId)
                    this.$emit('handleOnCloseModal')
                } catch (err) {
                    this.resetDelete()
                    this.catchError(err)
                }
            }
        },
        async onClickUpdate() {
            this.error = null
            this.loading = true
            try {
                const budgetId = get(() => this.budget.id)
                const data = {
                    ...this.budget,
                    name: this.name,
                    amount: this.amount,
                }
                await this.UPDATE_BUDGET({ budgetId, data })
                this.$emit('handleOnCloseModal')
            } catch (err) {
                this.catchError(err)
            }
        },
        resetDelete() {
            this.startDelete = false
            this.deleting = false
        },
        handleOnClickApply({ nextDateOne }) {
            this.date = nextDateOne
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
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';

.budgets-form {
    .field:last-child {
        margin-bottom: 0;
    }
}

.budgets-form__fields {
    padding: 1rem;
}

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
