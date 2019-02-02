import { inject, observer } from "mobx-react";
import { parse } from "query-string";
import React from "react";
import DocumentTitle from "react-document-title";
import { Redirect } from "react-router";

import {
    Box,
    Button,
    Col,
    Field,
    Grid,
    Link,
    Row,
    Text
} from "../../../components";
import { get } from "../../../lib/get";
import RootStore from "../../../store";

interface Props {
    location: any;
    rootStore: RootStore;
}

class LogInClass extends React.Component<Props> {
    public componentWillMount() {
        const {
            location,
            rootStore: {
                logInStore: { setEmail }
            }
        } = this.props;
        const queryParams = parse(location.search);
        const email = get(() => queryParams.email);
        if (email) {
            setEmail(email);
        }
    }

    public componentWillUnmount() {
        this.props.rootStore.logInStore.reset();
    }

    public render() {
        const {
            location,
            rootStore: { logInStore, isAuthenticated }
        } = this.props;

        const queryParams = parse(location.search);
        const redirect = get(() => location.state.from) ||
            queryParams.redirect || { pathname: "/" };
        if (logInStore.redirectToReferrer || isAuthenticated) {
            return <Redirect to={redirect} />;
        }

        const { email, error, isLoading, password, validations } = logInStore;

        return (
            <DocumentTitle title="Log In | Wilbur">
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
                                        Welcome back
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Text>
                                        Need an account?{" "}
                                        <Link
                                            color={Link.Color.Gray1}
                                            decoration={true}
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
                                            autofocus={true}
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
                                            Log In
                                        </Button>
                                    </Box>

                                    <Box mt={1}>
                                        <Text
                                            color={Text.Color.Gray5}
                                            size={Text.Size.Xs}
                                        >
                                            Splendid to see you again, Old
                                            Sport.
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
            </DocumentTitle>
        );
    }

    private onChangeEmail = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.logInStore.setEmail(e.target.value);
    };

    private onChangePassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.logInStore.setPassword(e.target.value);
    };

    private onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.rootStore.logInStore.logIn();
    };
}

export const LogIn = inject("rootStore")(observer(LogInClass));
