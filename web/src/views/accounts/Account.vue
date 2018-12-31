<template>
    <div :title="title">
        <template slot="content">
            <form class="budgets-form">
                <div v-if="error">{{error}}</div>
                <div
                    v-if="account"
                    class="budgets-form__fields"
                >
                    <Field
                        v-model="name"
                        :error="nameError"
                        autofocus
                        id="name"
                        label="Name"
                    />
                    {{account.institution.name}} ending in {{account.account.mask}}
                </div>
                <div class="accounts-form__footer">
                    <template v-if="account">
                        <PlaidLink
                            :env="plaidEnv"
                            :publicKey="plaidPublicKey"
                            :token="account.public_token"
                            clientName="Wilbur"
                            v-bind="{ onSuccess }"
                        >Refresh Connection</PlaidLink>
                    </template>
                    <button
                        :disabled="networkActive"
                        @click.prevent="onClickUpdate"
                    >Update</button>
                    <router-link
                        :disabled="networkActive"
                        :to="{ name: 'Accounts' }"
                    >Cancel</router-link>
                    <button
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
import { required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import api from '@/api'
import Field from '@/components/core/form/Field'
import PlaidLink from '@/components/other/PlaidLink'

export default {
    name: 'Account',
    components: {
        Field,
        PlaidLink,
    },
    props: {
        item: {
            type: Object,
        },
        id: {
            type: String,
        },
    },
    data() {
        return {
            account: get(() => this.item),
            error: undefined,
            deleting: false,
            name: get(() => this.item.account.name),
            plaidEnv: process.env.VUE_APP_PLAID_ENV,
            plaidPublicKey: process.env.VUE_APP_PLAID_PUBLIC_KEY,
            startDelete: false,
            title: 'Update Account',
        }
    },
    computed: {
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
        nameError() {
            let error = undefined
            if (!this.$v.name.required) {
                error = 'Name is required'
            }
            return error
        },
        networkActive() {
            return this.loading || this.deleting
        },
    },
    async beforeRouteEnter(to, from, next) {
        try {
            const accountId = get(() => to.params.id)
            const res = await api.getItem(accountId)
            const account = get(() => res.data)
            next(vm => vm.initData(account))
        } catch (err) {
            next(vm => vm.$router.replace({ name: 'Accounts' }))
        }
    },
    async beforeRouteUpdate(to, from, next) {
        try {
            const accountId = get(() => to.params.id)
            const res = await api.getItem(accountId)
            const account = get(() => res.data)
            this.initData(account)
            next()
        } catch (err) {
            next(vm => vm.$router.replace({ name: 'Budgets' }))
        }
    },
    methods: {
        ...mapActions(['DELETE_ITEM']),
        catchError(err) {
            this.loading = false
            this.error = err
        },
        initData(account) {
            this.account = account
            this.name = account.account.name
        },
        async onClickDelete() {
            if (!this.startDelete) {
                this.startDelete = true
            } else {
                try {
                    this.error = undefined
                    this.deleting = true
                    await this.DELETE_ITEM(this.id)
                    this.$router.push({ name: 'Accounts' })
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
                    ...this.account.account,
                    name: this.name,
                }
                await api.updateAccount(this.account.id, data)
                this.$router.push({ name: 'Accounts' })
            } catch (err) {
                this.catchError(err)
            }
        },
        async onSuccess(token, data) {
            this.$router.push({ name: 'Accounts' })
        },
        resetDelete() {
            this.startDelete = false
            this.deleting = false
        },
    },
    validations: {
        name: {
            required,
        },
        validationGroup: ['name'],
    },
    metaInfo() {
        return {
            title: 'Update Account',
        }
    },
}
</script>
