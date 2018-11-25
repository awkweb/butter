<template>
    <div class="form">
        <h3 class="form__header">Change Password</h3>

        <div
            v-if="message"
            :class="['form__message', {
                success,
                error
            }]"
        >
            {{ message }}
        </div>

        <form class="form__container">
            <Field
                v-model="passwordVerify"
                :isValid="!$v.passwordVerify.$invalid"
                id="verify"
                label="Verify Current Password"
                type="password"
            />

            <Field
                v-model="password"
                :isValid="!$v.password.$invalid"
                id="password"
                label="New Password"
                showSuccess
                type="password"
            />

            <PasswordFeatures
                :hasLowercaseLetter="(password && $v.password.lowercase) || false"
                :hasUppercaseLetter="(password && $v.password.uppercase) || false"
                :hasNumber="(password && $v.password.digit) || false"
                :isMinLength="(password && $v.password.minLength) || false"
                :passwordsMatch="(passwordConfirm && $v.passwordConfirm.sameAs) || false"
            />

            <Field
                v-model="passwordConfirm"
                :isValid="!$v.passwordConfirm.$invalid"
                id="confirm-password"
                label="Confirm New Password"
                showSuccess
                type="password"
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
import { mapActions } from 'vuex'
import {
    helpers,
    minLength,
    not,
    required,
    sameAs,
} from 'vuelidate/lib/validators'
import { get } from '@/utils'
import PasswordFeatures from '@/components/PasswordFeatures'
import Field from '@/components/Field'

export default {
    name: 'SettingsChangePasswordForm',
    components: {
        Field,
        PasswordFeatures,
    },
    data: () => ({
        error: false,
        password: undefined,
        passwordConfirm: undefined,
        passwordVerify: undefined,
        loading: false,
        message: undefined,
        success: false,
    }),
    methods: {
        ...mapActions(['CHANGE_PASSWORD']),
        resetForm() {
            this.password = undefined
            this.passwordConfirm = undefined
            this.passwordVerify = undefined
        },
        async onClickUpdate() {
            this.message = undefined
            this.success = false
            this.error = false
            this.loading = true
            try {
                this.message = await this.CHANGE_PASSWORD({
                    password: this.password,
                    passwordConfirm: this.passwordConfirm,
                    passwordVerify: this.passwordVerify,
                })
                this.success = true
                this.resetForm()
            } catch (err) {
                let error
                if ('password_verify' in err) {
                    error = get(() => err.password_verify[0])
                } else if ('password' in err) {
                    error = get(() => err.password[0])
                }
                this.message = error
                this.error = true
            } finally {
                this.loading = false
            }
        },
    },
    validations: {
        passwordVerify: {
            sameAs: not(sameAs('password')),
            required,
        },
        password: {
            digit: helpers.regex('digit', /^.*[0-9]+.*$/),
            lowercase: helpers.regex('lowercase', /^.*[a-z]+.*$/),
            minLength: minLength(8),
            required,
            uppercase: helpers.regex('uppercase', /^.*[A-Z]+.*$/),
        },
        passwordConfirm: {
            sameAs: sameAs('password'),
            required,
        },
        validationGroup: ['password', 'passwordConfirm', 'passwordVerify'],
    },
}
</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';
@import '../../../assets/styles/functions';
@import '../../../assets/styles/mixins';
@import '../../../assets/styles/form';
</style>
