<template>
    <div class="budgets-form-footer">
        <button>Delete</button>
        <div>
            <button
                @click="onClickCancel"
            >
                Cancel
            </button>
            <button>Update</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BudgetsFormFooter',
    components: {},
    methods: {
        onClickCancel() {
            this.$emit('handleOnClickCancel')
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';

.budgets-form-footer {
    @include flex-row;
    justify-content: space-between;
}
</style>
