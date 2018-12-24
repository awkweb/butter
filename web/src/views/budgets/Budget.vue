<template>
  <Dashboard :title="title">
    <template slot="content">
      <form class="budgets-form">
        <div v-if="error" class="auth__error">{{ error }}</div>
        <div class="budgets-form__fields">
          <Field v-model="name" :error="nameError" autofocus id="name" label="Name"/>
          <Field v-model="amount" :error="amountError" id="amount" label="Amount" type="number"/>
        </div>
        <div class="budgets-form__footer">
          <div>
            <router-link :disabled="networkActive" :to="{ name: 'Budgets' }">Cancel</router-link>
            <button
              v-if="isUpdatable"
              :disabled="
                                $v.validationGroup.$invalid || networkActive
                            "
              type="submit"
              @click.prevent="onClickUpdate"
              @keyup.enter="onClickUpdate"
            >{{ loading ? 'Updating...' : 'Update' }}</button>
            <button
              v-else
              :disabled="
                                $v.validationGroup.$invalid || networkActive
                            "
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
  </Dashboard>
</template>

<script>
import { mapActions } from 'vuex'
import { minValue, required } from 'vuelidate/lib/validators'
import { formatDateRange, get, toAmount, toCents } from '@/utils'
import api from '@/api'
import Dashboard from '@/layouts/Dashboard'
import Field from '@/components/forms/Field'

export default {
    name: 'Budget',
    components: {
        Dashboard,
        Field,
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
                return 'Update Budget'
            } else {
                return 'New Budget'
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
                next(vm => vm.$router.replace({ name: 'Budgets' }))
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
                next(vm => vm.$router.replace({ name: 'Budgets' }))
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
                this.$router.push({ name: 'Budgets' })
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
                    this.$router.push({ name: 'Budgets' })
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
                this.$router.push({ name: 'Budgets' })
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
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

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
