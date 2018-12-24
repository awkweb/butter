<template>
  <div class="form">
    <h3 class="form__header">Basic information</h3>

    <div
      v-if="message"
      :class="['form__message', {
                success,
                error
            }]"
    >{{ message }}</div>

    <form class="form__container">
      <Field v-model="firstName" id="firstName" label="First Name"/>

      <Field v-model="lastName" id="lastName" label="Last Name"/>

      <Field v-model="email" :isValid="!$v.email.$invalid" id="email" label="Email"/>

      <button
        :class="['form__button', { loading }]"
        :disabled="$v.validationGroup.$invalid || loading"
        @click.prevent="onClickUpdate"
      >{{ loading ? 'Updating...' : 'Update' }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Field from '@/components/forms/Field'

export default {
    name: 'SettingsBasicInfoForm',
    components: {
        Field,
    },
    data: () => ({
        email: undefined,
        error: undefined,
        firstName: undefined,
        lastName: undefined,
        loading: false,
        message: undefined,
        success: false,
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
        ...mapActions(['UPDATE_USER_INFO']),
        async onClickUpdate() {
            this.message = undefined
            this.success = false
            this.error = false
            this.loading = true
            try {
                this.message = await this.UPDATE_USER_INFO({
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                })
                this.success = true
            } catch (err) {
                let error
                if ('email' in err) {
                    error = get(() => err.email[0])
                }
                this.message = error
                this.error = true
            } finally {
                this.loading = false
            }
        },
    },
    validations: {
        email: {
            email,
            required,
        },
        validationGroup: ['email'],
    },
}
</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';
@import '../../../assets/styles/form';
</style>
