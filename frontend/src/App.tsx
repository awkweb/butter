import React, { Component } from "react";
import Text from "./components/core/typography/Text";
import { ThemeProvider } from "./components/core/theme/ThemeProvider";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: Function) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: Function) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(({ history }) =>
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
);

function PrivateRoute({
    component: Component,
    ...rest
}: {
    component: any;
    path: string;
}) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

interface LoginProps {
    location: any;
}
class Login extends React.Component<LoginProps> {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <Router>
                    <div>
                        <AuthButton />
                        <ul>
                            <li>
                                <Link to="/public">Public Page</Link>
                            </li>
                            <li>
                                <Link to="/protected">Protected Page</Link>
                            </li>
                        </ul>
                        <div className="App">
                            <Text font={Text.Font.Title} size={Text.Size.Md}>
                                merp
                            </Text>
                        </div>
                        <Route path="/public" component={Public} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/protected" component={Protected} />
                    </div>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
