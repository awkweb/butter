import React from "react";
import { Redirect } from "react-router";
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
import { get } from "../../../utils";

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
        // console.log(e);
        this.props.rootStore.logInStore.setEmail(e.target.value);
    };

    onChangePassword = (e: React.ChangeEvent<any>) => {
        this.props.rootStore.logInStore.setPassword(e.target.value);
    };

    onClickLogIn = () => {
        this.props.rootStore.logInStore.logIn();
        // fakeAuth.authenticate(() => {
        //     this.setState({ redirectToReferrer: true });
        // });
    };

    render() {
        const {
            location,
            rootStore: { logInStore }
        } = this.props;

        let from = get(() => location.state.from, { from: { pathname: "/" } });
        if (logInStore.redirectToReferrer) return <Redirect to={from} />;

        const { email, isLoading, password, validations } = logInStore;
        // console.log(email);

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
                                        weight={Text.Weight.Bold}
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
                                >
                                    <Box mb={2}>
                                        <Field
                                            autofocus
                                            id="email"
                                            label="Email"
                                            value={email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Field
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
                                            onClick={this.onClickLogIn}
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
