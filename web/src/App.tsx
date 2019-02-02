import { observer, Provider } from "mobx-react";
import React from "react";
import DocumentTitle from "react-document-title";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Navbar, PrivateRoute, PublicRoute, ThemeProvider } from "./components";
import { get } from "./lib/get";
import {
    Accounts,
    Budget,
    Budgets,
    LogIn,
    NoMatch,
    Register,
    Transaction,
    Transactions
} from "./pages";
import RootStore from "./store";

class App extends React.Component {
    public rootStore = new RootStore();

    public componentWillMount() {
        const user = get(() =>
            JSON.parse(localStorage.getItem("user") as string)
        );
        if (user) {
            this.rootStore.setUser(user);
        }
    }

    public render() {
        const { isAuthenticated, userInitial, logOut } = this.rootStore;
        return (
            <ThemeProvider>
                <Provider rootStore={this.rootStore}>
                    <DocumentTitle title="Wilbur">
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
                                    <Route path="/login" component={LogIn} />
                                    <PublicRoute
                                        path="/register"
                                        component={Register}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <PrivateRoute
                                        path="/accounts"
                                        component={Accounts}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <PrivateRoute
                                        path="/budgets/:id"
                                        component={Budget}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <PrivateRoute
                                        path="/budgets"
                                        component={Budgets}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <PrivateRoute
                                        path="/transactions/:id"
                                        component={Transaction}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <PrivateRoute
                                        path="/transactions"
                                        component={Transactions}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <Route
                                        path="/"
                                        render={this.budgetRedirect}
                                    />
                                    <Route component={NoMatch} />
                                </Switch>
                            </React.Fragment>
                        </BrowserRouter>
                    </DocumentTitle>
                </Provider>
            </ThemeProvider>
        );
    }

    private budgetRedirect = () => {
        return <Redirect to="/budgets" />;
    };
}

export default observer(App);
