import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
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
import RootStore from "../../../store";

interface Props {
    location: Location;
    rootStore: RootStore;
}

class RegisterClass extends React.Component<Props> {
    componentWillMount() {
        const {
            location,
            rootStore: {
                registerStore: { setEmail }
            }
        } = this.props;
        const params = new URLSearchParams(location.search);
        const email = params.get("email");
        if (email) setEmail(email);
    }

    componentWillUnmount() {
        this.props.rootStore.registerStore.reset();
    }

    onChangeEmail = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setEmail(e.target.value);
    };

    onChangePassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setPassword(e.target.value);
    };

    onChangeConfirmPassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.registerStore.setPasswordConfirm(e.target.value);
    };

    onClickRegister = () => {
        this.props.rootStore.registerStore.register();
        // fakeAuth.authenticate(() => {
        //     this.setState({ redirectToReferrer: true });
        // });
    };

    render() {
        const {
            rootStore: { registerStore }
        } = this.props;

        const {
            email,
            isLoading,
            password,
            passwordConfirm,
            validations
        } = registerStore;

        return (
            <DocumentTitle title="Register | Wilbur">
                <Grid maxWidth="md">
                    <Row>
                        <Col
                            fluidHeight
                            bottomPadding={false}
                            md={6}
                            xs={12}
                            offset={{ md: 3 }}
                        >
                            <Box mt={{ xs: 8, md: 12 }}>
                                <Box mb={1}>
                                    <Text
                                        font={Text.Font.Title}
                                        size={Text.Size.Xl}
                                        weight={Text.Weight.Bold}
                                    >
                                        Register an account
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Text size={Text.Size.Sm}>
                                        Been here before?{" "}
                                        <Link
                                            color={Link.Color.Gray1}
                                            decoration
                                            size={Text.Size.Sm}
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
                                >
                                    <Box mb={2}>
                                        <Field
                                            autofocus
                                            id="email"
                                            isValid={validations.email.valid}
                                            label="Email"
                                            showSuccess
                                            value={email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Field
                                            id="password"
                                            isValid={validations.password.valid}
                                            label="Password"
                                            showSuccess
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
                                            id="confirmPassword"
                                            isValid={
                                                validations.passwordConfirm
                                                    .valid
                                            }
                                            label="Confirm Password"
                                            showSuccess
                                            type={Field.Type.Password}
                                            value={passwordConfirm}
                                            onChange={
                                                this.onChangeConfirmPassword
                                            }
                                        />
                                    </Box>

                                    <Box fluidWidth>
                                        <Button
                                            color={Button.Color.Brand}
                                            disabled={!validations.all.valid}
                                            fluid
                                            isLoading={isLoading}
                                            size={Button.Size.Md}
                                            textAlign={Button.TextAlign.Left}
                                            onClick={this.onClickRegister}
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>

                                    <Box mt={1}>
                                        <Text
                                            color={Text.Color.Gray5}
                                            size={Text.Size.Xxs}
                                        >
                                            By clicking this button, you agree
                                            to Wilbur’s{" "}
                                            <Link
                                                color={Text.Color.Gray5}
                                                decoration
                                                size={Text.Size.Xxs}
                                                to="/terms"
                                            >
                                                Terms of Use
                                            </Link>
                                            .
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const Register = inject("rootStore")(observer(RegisterClass));
