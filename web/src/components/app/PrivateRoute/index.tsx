import * as React from "react";
import { Route, Redirect } from "react-router";

interface Props {
    component: any;
    exact: boolean;
    isAuthenticated: boolean;
    path: string | Array<string>;
}

export class PrivateRoute extends React.Component<Props> {
    static defaultProps = {
        exact: true
    };

    render() {
        const {
            component: Component,
            exact,
            isAuthenticated,
            path
        } = this.props;
        const routeProps = {
            exact,
            path
        };
        return (
            <Route
                {...routeProps}
                render={props =>
                    isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                                search: `?redirect=${encodeURIComponent(
                                    props.location.pathname
                                )}`
                            }}
                        />
                    )
                }
            />
        );
    }
}
