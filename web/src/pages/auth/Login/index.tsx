import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import {
    Grid,
    Row,
    Col,
    Box,
    Text,
    Link,
    Field,
    Button
} from "../../../components";
import RootStore from "../../../store";
import { Redirect } from "react-router";
import { get } from "../../../lib/get";

interface Props {
    location: any;
    rootStore: RootStore;
}

class LogInClass extends React.Component<Props> {
    componentWillMount() {
        const {
            location,
            rootStore: {
                logInStore: { setEmail }
            }
        } = this.props;
        const params = new URLSearchParams(location.search);
        const email = params.get("email");
        if (email) setEmail(email);
    }

    componentWillUnmount() {
        this.props.rootStore.logInStore.reset();
    }

    onChangeEmail = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.logInStore.setEmail(e.target.value);
    };

    onChangePassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.logInStore.setPassword(e.target.value);
    };

    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.rootStore.logInStore.logIn();
    };

    render() {
        const {
            location,
            rootStore: { logInStore, isAuthenticated }
        } = this.props;

        const params = new URLSearchParams(location.search);
        const redirect = get(() => location.state.from) ||
            params.get("redirect") || { pathname: "/" };
        if (logInStore.redirectToReferrer || isAuthenticated) {
            return <Redirect to={redirect} />;
        }

        const { email, error, isLoading, password, validations } = logInStore;

        return (
            <DocumentTitle title="Log In | Wilbur">
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
                                        weight={Text.Weight.SemiBold}
                                    >
                                        Welcome back
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Text size={Text.Size.Sm}>
                                        Need an account?{" "}
                                        <Link
                                            color={Link.Color.Gray1}
                                            decoration
                                            size={Text.Size.Sm}
                                            to={{
                                                pathname: "/register",
                                                search:
                                                    !!email && `?email=${email}`
                                            }}
                                        >
                                            Sign up
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
                                            autofocus
                                            id="email"
                                            label="Email"
                                            value={email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Field
                                            autocomplete="current-password"
                                            id="password"
                                            label="Password"
                                            onChange={this.onChangePassword}
                                            type={Field.Type.Password}
                                            value={password}
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
                                            type="submit"
                                        >
                                            Log In
                                        </Button>
                                    </Box>

                                    <Box mt={1}>
                                        <Text
                                            color={Text.Color.Gray5}
                                            size={Text.Size.Xxs}
                                        >
                                            So splendid to see you again, Old
                                            Sport.
                                        </Text>
                                    </Box>

                                    {!!error && (
                                        <Box mt={3}>
                                            <Text
                                                color={Text.Color.Red3}
                                                size={Text.Size.Sm}
                                            >
                                                {error}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const LogIn = inject("rootStore")(observer(LogInClass));
