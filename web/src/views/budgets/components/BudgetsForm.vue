<template>
    <div class="budgets-form">
        <Field
            v-model="name"
            id="name"
            label="Name"
        />
        <Field
            v-model="amount"
            id="amount"
            label="Amount"
            type="number"
        />
    </div>
</template>

<script>
import { get } from '@/utils'
import Field from '@/components/Field'

export default {
    name: 'BudgetsForm',
    data: () => ({
        amount: undefined,
        name: undefined,
    }),
    components: {
        Field,
    },
    methods: {},
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
</style>
