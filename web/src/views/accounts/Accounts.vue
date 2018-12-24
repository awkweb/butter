<template>
    <Dashboard>
        <template slot="content">
            <PlaidLink
                :env="plaidEnv"
                :publicKey="plaidPublicKey"
                clientName="Wilbur"
                v-bind="{ onSuccess }"
            >Connect Account</PlaidLink>
            <Loader v-if="loading"/>
            <template v-else>
                <div>
                    <div v-for="item in items" :key="item.id">
                        <router-link
                            :to="{ name: 'Account', params: { id: item.id, item }}"
                        >{{item.institution.name}} ending in {{item.account.mask}}</router-link>
                        <button @click="onClickDisconnect(item.id)">Disconnect</button>
                    </div>
                </div>
            </template>
        </template>
    </Dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/indicators/Loader'
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'Accounts',
    components: {
        Dashboard,
        Loader,
        PlaidLink,
    },
    data: () => ({
        plaidEnv: process.env.VUE_APP_PLAID_ENV,
        plaidPublicKey: process.env.VUE_APP_PLAID_PUBLIC_KEY,
        loading: false,
    }),
    computed: {
        ...mapGetters(['items']),
    },
    async created() {
        this.loading = true
        try {
            await this.GET_ITEMS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions([
            'CREATE_ITEM',
            'DELETE_ITEM',
            'GET_ITEMS',
            'UPDATE_ITEM',
        ]),
        onSuccess(token, data) {
            const { account, institution } = data
            this.CREATE_ITEM({
                institution,
                account: {
                    ...account,
                    account_id: account.id,
                    id: undefined,
                },
                public_token: token,
            })
        },
        async onClickDisconnect(itemId) {
            try {
                await this.DELETE_ITEM(itemId)
            } catch (e) {
                console.log(e)
            }
        },
    },
    metaInfo: {
        title: 'Connected Accounts',
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';
</style>
