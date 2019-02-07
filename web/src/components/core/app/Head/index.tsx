import * as React from "react";
import Helmet from "react-helmet";

export class Head extends React.Component {
    public render() {
        return (
            <Helmet defaultTitle="Wilbur" titleTemplate="%s | Wilbur">
                <html lang="en" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Helmet>
        );
    }
}
