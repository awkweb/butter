import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import DocumentTitle from "react-document-title";
import RootStore from "./store";
import { Home, LogIn, Register } from "./pages";
import { PrivateRoute, PublicRoute, ThemeProvider } from "./components";

class App extends Component {
    rootStore = new RootStore();

    render() {
        const { isAuthenticated } = this.rootStore;
        return (
            <ThemeProvider>
                <Provider rootStore={this.rootStore}>
                    <DocumentTitle title="Wilbur">
                        <Router>
                            <React.Fragment>
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
                                    path="/"
                                    component={Home}
                                    isAuthenticated={isAuthenticated}
                                />
                            </React.Fragment>
                        </Router>
                    </DocumentTitle>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default observer(App);
