import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RootStore from "../store";
import { Budgets, LogIn, Register, NoMatch, Dashboard } from "../pages";
import { PrivateRoute, PublicRoute, Navbar } from "../components";

interface Props {
    rootStore: RootStore;
}

export default class Router extends React.Component<Props> {
    render() {
        const {
            rootStore: { isAuthenticated, userInitial, logOut }
        } = this.props;
        return (
            <BrowserRouter>
                <React.Fragment>
                    {isAuthenticated && (
                        <Navbar
                            location={location}
                            userInitial={userInitial}
                            handleLogOut={logOut}
                        />
                    )}
                    <Switch>
                        <PrivateRoute
                            path="/"
                            component={Dashboard}
                            isAuthenticated={isAuthenticated}
                        />
                        <PublicRoute
                            path="/login"
                            component={LogIn}
                            isAuthenticated={isAuthenticated}
                        />
                        <PublicRoute
                            path="/register"
                            component={Register}
                            isAuthenticated={isAuthenticated}
                        />
                        <PrivateRoute
                            path="/budgets"
                            component={Budgets}
                            isAuthenticated={isAuthenticated}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
