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
                            Welcome back
                        </Tex>
                    </Box>

                    <Box :mb="4">
                        <Tex size="Sm">
                            Need an account?
                            <Ref
                                color="Gray1"
                                decoration="Underline"
                                size="Sm"
                                :to="{ name: 'Register', query: { email: this.email }}"
                            >
                                Sign up
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
                            />
                        </Box>

                        <Box :mb="2">
                            <Field
                                v-model="password"
                                :isValid="!$v.password.$invalid"
                                id="password"
                                label="Password"
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
                                :onClick="onClickLogIn"
                            >
                                Log In
                            </Button>
                        </Box>

                        <Box :mt="1">
                            <Tex
                                color="Gray5"
                                size="Xxs"
                            >
                                So splendid to see you again, Old Sport.
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
import { email, required } from 'vuelidate/lib/validators'
import { get } from '@/utils'
import Box from '@/components/core/layout/Box'
import Button from '@/components/core/actions/Button'
import Column from '@/components/core/layout/Column'
import Field from '@/components/core/form/Field'
import Grid from '@/components/core/layout/Grid'
import Ref from '@/components/core/actions/Ref'
import Row from '@/components/core/layout/Row'
import Tex from '@/components/core/typography/Tex'

export default {
    name: 'LogIn',
    components: {
        Box,
        Button,
        Column,
        Field,
        Grid,
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
        }
    },
    methods: {
        ...mapActions(['LOG_IN_USER']),
        async onClickLogIn() {
            this.error = undefined
            this.loading = true
            try {
                await this.LOG_IN_USER({
                    email: this.email,
                    password: this.password,
                })
                this.$router.push({ name: 'Home' })
            } catch (err) {
                let error
                if ('email' in err) {
                    error = get(() => err.email[0])
                } else if ('password' in err) {
                    error = get(() => err.password[0])
                } else if ('non_field_errors' in err) {
                    error = get(() => err.non_field_errors[0])
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
            required,
        },
        validationGroup: ['email', 'password'],
    },
    metaInfo: {
        title: 'Log In',
    },
}
</script>
