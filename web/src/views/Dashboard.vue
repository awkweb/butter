<template>
  <div class="home">
    <plaid-link
      :env="plaidEnv"
      :publicKey="plaidPublicKey"
      clientName="budget"
      v-bind="{ onSuccess }"
    >
      Open Plaid Link
    </plaid-link>
  </div>
</template>

<script>
import PlaidLink from '@/components/PlaidLink'

export default {
    name: 'home',
    components: {
        PlaidLink,
    },
    data: () => ({
        plaidEnv: process.env.VUE_APP_PLAID_ENV,
        plaidPublicKey: process.env.VUE_APP_PLAID_PUBLIC_KEY,
    }),
    methods: {
        onSuccess(token) {
            console.log(token)
        },
    },
}
</script>
