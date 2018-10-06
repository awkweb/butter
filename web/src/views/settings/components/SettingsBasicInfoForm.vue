<template>
    <div class="form">
        <h3 class="form__header">Basic information</h3>

        <div
            v-if="error"
            class="form__error"
        >
            {{ error }}
        </div>

        <form class="form__container">
            <Field
                v-model="firstName"
                :isValid="!$v.firstName.$invalid"
                id="firstName"
                label="First Name"
            />

            <Field
                v-model="lastName"
                :isValid="!$v.lastName.$invalid"
                id="lastName"
                label="Last Name"
            />

            <Field
                v-model="email"
                :isValid="!$v.email.$invalid"
                id="email"
                label="Email"
            />

            <button
                :class="['form__button', { loading }]"
                :disabled="$v.validationGroup.$invalid || loading"
                @click.prevent="onClickUpdate"
            >
                {{ loading ? 'Updating...' : 'Update' }}
            </button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Field from '@/components/Field'

export default {
    name: 'SettingsBasicInfoForm',
    components: {
        Field,
    },
    data: () => ({
        email: null,
        error: null,
        firstName: null,
        lastName: null,
        loading: false,
    }),
    computed: {
        ...mapGetters(['user']),
    },
    created() {
        this.firstName = get(() => this.user.first_name)
        this.lastName = get(() => this.user.last_name)
        this.email = get(() => this.user.email)
    },
    methods: {
        onClickUpdate() {
            this.$emit('handleOnClickUpdate')
        },
    },
    validations: {
        email: {
            email,
            required,
        },
        firstName: {
            required,
        },
        lastName: {
            required,
        },
        validationGroup: ['email', 'firstName', 'lastName'],
    },
}
</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';
@import '../../../assets/styles/form';
</style>
