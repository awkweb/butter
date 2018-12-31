<template>
    <Grid maxWidth="Md">
        <Row>
            <Column
                fluidHeight
                :bottomPadding="false"
                :md="6"
                :xs="12"
                :offset="{ md: 3 }"
            >
                <Box :mt="{ xs: 8, md: 12 }">
                    <Box :mb="1">
                        <Tex
                            size="Xl"
                            weight="Heavy"
                        >
                            Register an account
                        </Tex>
                    </Box>

                    <Box :mb="4">
                        <Tex size="Sm">
                            Been here before?
                            <Ref
                                color="Gray1"
                                decoration="Underline"
                                size="Sm"
                                :to="{ name: 'LogIn', query: { email: this.email }}"
                            >
                                Log in
                            </Ref>
                        </Tex>
                    </Box>

                    <Box
                        display="Flex"
                        el="Form"
                        flexDirection="Column"
                    >
                        <Box :mb="2">
                            <Field
                                v-model="email"
                                :isValid="!$v.email.$invalid"
                                autofocus
                                id="email"
                                label="Email"
                                showSuccess
                            />
                        </Box>

                        <Box :mb="2">
                            <Field
                                v-model="password"
                                :isValid="!$v.password.$invalid"
                                id="password"
                                label="Password"
                                showSuccess
                                type="Password"
                            />

                            <Box :mt="1.25">
                                <PasswordFeatures
                                    :hasLowercaseLetter="(password && $v.password.lowercase) || false"
                                    :hasUppercaseLetter="(password && $v.password.uppercase) || false"
                                    :hasNumber="(password && $v.password.digit) || false"
                                    :isMinLength="(password && $v.password.minLength) || false"
                                />
                            </Box>
                        </Box>

                        <Box :mb="2">
                            <Field
                                v-model="passwordConfirm"
                                :isValid="!$v.passwordConfirm.$invalid"
                                id="confirm-password"
                                label="Confirm Password"
                                showSuccess
                                type="Password"
                            />
                        </Box>

                        <Box fluidWidth>
                            <Button
                                color="Brand"
                                fluid
                                size="Lg"
                                textAlign="Left"
                                :disabled="$v.validationGroup.$invalid || loading"
                                :isLoading="loading"
                                :onClick="onClickRegister"
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box :mt="1">
                            <Tex
                                color="Gray5"
                                size="Xxs"
                            >
                                By clicking this button, you agree to Wilbur’s
                                <Ref
                                    color="Gray5"
                                    decoration="Underline"
                                    size="Xxs"
                                    :to="{ name: 'Home' }"
                                >
                                    Terms of Use
                                </Ref>
                            </Tex>
                        </Box>

                        <Box
                            v-if="error"
                            :mt="3"
                        >
                            <Tex
                                color="Red3"
                                size="Sm"
                            >
                                {{ error }}
                            </Tex>
                        </Box>
                    </Box>
                </Box>
            </Column>
        </Row>
    </Grid>
</template>

<script>
import { mapActions } from 'vuex'
import {
    email,
    helpers,
    minLength,
    required,
    sameAs,
} from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Box from '@/components/core/layout/Box'
import Button from '@/components/core/actions/Button'
import Column from '@/components/core/layout/Column'
import Field from '@/components/core/form/Field'
import Grid from '@/components/core/layout/Grid'
import PasswordFeatures from '@/components/ui/PasswordFeatures'
import Ref from '@/components/core/actions/Ref'
import Row from '@/components/core/layout/Row'
import Tex from '@/components/core/typography/Tex'

export default {
    name: 'Register',
    components: {
        Box,
        Button,
        Column,
        Field,
        Grid,
        PasswordFeatures,
        Ref,
        Row,
        Tex,
    },
    props: {
        emailParam: {
            type: String,
        },
    },
    data() {
        return {
            email: get(() => this.emailParam),
            error: undefined,
            loading: false,
            password: undefined,
            passwordConfirm: undefined,
        }
    },
    methods: {
        ...mapActions(['SIGN_UP_USER']),
        async onClickRegister() {
            this.error = undefined
            this.loading = true
            try {
                await this.SIGN_UP_USER({
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm,
                })
                this.$router.push({ name: 'Home' })
            } catch (err) {
                let error
                if ('email' in err) {
                    error = get(() => err.email[0])
                } else if ('password' in err) {
                    error = get(() => err.password[0])
                }
                this.loading = false
                this.error = error
            }
        },
    },
    validations: {
        email: {
            email,
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
        validationGroup: ['email', 'password', 'passwordConfirm'],
    },
    metaInfo: {
        title: 'Sign Up',
    },
}
</script>
