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
        </div>
        <div class="budgets-form__footer">
            <button
                v-if="budget"
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
                    v-if="budget"
                    :disabled="$v.validationGroup.$invalid || networkActive"
                    type="submit"
                    @click.prevent="onClickUpdate"
                    @keyup.enter="onClickUpdate"
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
import { minValue, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Field from '@/components/Field'

export default {
    name: 'BudgetsForm',
    props: {
        budget: {
            type: Object,
        },
    },
    data() {
        return {
            error: null,
            deleting: false,
            loading: false,
            amount: get(() => this.budget.budgeted) || null,
            name: get(() => this.budget.name) || null,
            startDelete: false,
        }
    },
    components: {
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
