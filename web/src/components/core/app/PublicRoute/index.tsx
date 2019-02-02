import * as React from "react";
import { Redirect, Route } from "react-router";

interface Props {
    component: any;
    exact: boolean;
    isAuthenticated: boolean;
    path: string | string[];
}

export class PublicRoute extends React.Component<Props> {
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
        return !isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        );
    };
}
