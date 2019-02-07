import { inject, observer } from "mobx-react";
import { parse } from "query-string";
import React from "react";
import Helmet from "react-helmet";

import {
    Box,
    Button,
    Col,
    Field,
    Grid,
    Link,
    PasswordFeatures,
    Row,
    Text
} from "../../../components";
import { get } from "../../../lib/get";
import RootStore from "../../../store";

interface Props {
    location: Location;
    rootStore: RootStore;
}

class RegisterClass extends React.Component<Props> {
    public componentWillMount() {
        const {
            location,
            rootStore: {
                registerStore: { setEmail }
            }
        } = this.props;
        const queryParams = parse(location.search);
        const email = get(() => queryParams.email);
        if (email) {
            setEmail(email);
        }
    }

    public componentWillUnmount() {
        this.props.rootStore.registerStore.reset();
    }

    public render() {
        const {
            rootStore: {
                registerStore: {
                    email,
                    error,
                    isLoading,
                    password,
                    passwordConfirm,
                    validations
                }
            }
        } = this.props;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Register</title>
                </Helmet>
                <Grid maxWidth="md">
                    <Row>
                        <Col
                            fluidHeight={true}
                            bottomPadding={false}
                            md={6}
                            xs={12}
                            offset={{ md: 3 }}
                        >
                            <Box mt={{ xs: 8, md: 12 }}>
                                <Box mb={1}>
                                    <Text
                                        font={Text.Font.Title}
                                        size={Text.Size.Xxl}
                                    >
                                        Register an account
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Text>
                                        Been here before?{" "}
                                        <Link
                                            color={Link.Color.Gray1}
                                            decoration={true}
                                            to={{
                                                pathname: "/login",
                                                search:
                                                    !!email && `?email=${email}`
                                            }}
                                        >
                                            Log in
                                        </Link>
                                    </Text>
                                </Box>

                                <Box
                                    display={Box.Display.Flex}
                                    el={Box.Element.Form}
                                    flexDirection={Box.FlexDirection.Column}
                                    onSubmit={this.onSubmit}
                                >
                                    <Box mb={2}>
                                        <Field
                                            autocomplete="username email"
                                            autofocus={true}
                                            id="email"
                                            isValid={validations.email.valid}
                                            label="Email"
                                            showSuccess={true}
                                            value={email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Field
                                            autocomplete="new-password"
                                            id="password"
                                            isValid={validations.password.valid}
                                            label="Password"
                                            showSuccess={true}
                                            type={Field.Type.Password}
                                            value={password}
                                            onChange={this.onChangePassword}
                                        />
                                        <Box mt={1.25}>
                                            <PasswordFeatures
                                                hasLowercaseLetter={
                                                    !!password &&
                                                    validations.password
                                                        .lowercase
                                                }
                                                hasUppercaseLetter={
                                                    !!password &&
                                                    validations.password
                                                        .uppercase
                                                }
                                                hasNumber={
                                                    !!password &&
                                                    validations.password.digit
                                                }
                                                isMinLength={
                                                    !!password &&
                                                    validations.password
                                                        .minLength
                                                }
                                            />
                                        </Box>
                                    </Box>

                                    <Box mb={2}>
                                        <Field
                                            autocomplete="new-password"
                                            id="confirmPassword"
                                            isValid={
                                                validations.passwordConfirm
                                                    .valid
                                            }
                                            label="Confirm Password"
                                            showSuccess={true}
                                            type={Field.Type.Password}
                                            value={passwordConfirm}
                                            onChange={
                                                this.onChangeConfirmPassword
                                            }
                                        />
                                    </Box>

                                    <Box fluidWidth={true}>
                                        <Button
                                            color={Button.Color.Brand}
                                            disabled={!validations.all.valid}
                                            fluid={true}
                                            isLoading={isLoading}
                                            size={Button.Size.Lg}
                                            textAlign={Button.TextAlign.Left}
                                            type="submit"
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>

                                    <Box mt={1}>
                                        <Text
                                            color={Text.Color.Gray5}
                                            size={Text.Size.Xs}
                                        >
                                            By clicking this button, you agree
                                            to Wilbur&#8217;s{" "}
                                            <Link
                                                color={Text.Color.Gray5}
                                                decoration={true}
                                                size={Text.Size.Xs}
                                                to="/terms"
                                            >
                                                Terms of Use
                                            </Link>
                                            .
                                        </Text>
                                    </Box>

                                    {!!error && (
                                        <Box mt={3}>
                                            <Text color={Text.Color.Red3}>
                                                {error}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </React.Fragment>
        );
    }

    private onChangeEmail = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setEmail(e.target.value);
    };

    private onChangePassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setPassword(e.target.value);
    };

    private onChangeConfirmPassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setPasswordConfirm(e.target.value);
    };

    private onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.rootStore.registerStore.register();
    };
}

export const Register = inject("rootStore")(observer(RegisterClass));
