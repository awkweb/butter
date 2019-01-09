import React from "react";
import { observer, Provider } from "mobx-react";
import DocumentTitle from "react-document-title";
import RootStore from "./store";
import { ThemeProvider, Navbar, PrivateRoute, PublicRoute } from "./components";
import { get } from "./utils";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
    NoMatch,
    Budgets,
    Register,
    LogIn,
    Dashboard,
    Budget,
    Accounts,
    Transaction,
    Transactions
} from "./pages";

class App extends React.Component {
    rootStore = new RootStore();

    componentWillMount() {
        const user = get(() =>
            JSON.parse(localStorage.getItem("user") as string)
        );
        if (user) {
            this.rootStore.setUser(user);
        }
    }

    render() {
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
                                    <PrivateRoute
                                        path="/"
                                        component={Dashboard}
                                        isAuthenticated={isAuthenticated}
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
}

export default observer(App);
