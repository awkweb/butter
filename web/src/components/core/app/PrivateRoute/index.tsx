import * as React from "react";
import { Redirect, Route } from "react-router";

interface Props {
    component: any;
    exact: boolean;
    isAuthenticated: boolean;
    path: string | string[];
}

export class PrivateRoute extends React.Component<Props> {
    public static defaultProps = {
        exact: true
    };

    public render() {
        const { exact, path } = this.props;
        const routeProps = {
            exact,
            path
        };
        return <Route {...routeProps} render={this.renderComponent} />;
    }

    private renderComponent = (props: any) => {
        const { component: Component, isAuthenticated } = this.props;
        return isAuthenticated ? (
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
        );
    };
}
