import PropTypes from "prop-types";
import * as React from "react";

import { ThemeProvider as SCThemeProvider } from "styled-components";
import theme, { GlobalStyle } from "../../../theme/index";
import "../../../../assets/styles/fonts.css";

interface Props {
    children: string | number | React.ReactElement<any> | undefined;
    excludeGlobalStyles?: boolean;
}

interface ProviderContext {
    breakpoints: number[];
    containerWidths: number[];
    getSectionSize: () => any;
    gutterWidth: number;
}

export class ThemeProvider extends React.Component<Props> {
    public static defaultProps = {
        excludeGlobalStyles: false
    };

    public static childContextTypes = {
        breakpoints: PropTypes.arrayOf(PropTypes.number),
        containerWidths: PropTypes.arrayOf(PropTypes.number),
        getSectionSize: PropTypes.func,
        gutterWidth: PropTypes.number
    };

    public getChildContext(): ProviderContext {
        return this.context;
    }

    public render() {
        const { children, excludeGlobalStyles } = this.props;
        return (
            <SCThemeProvider theme={theme}>
                <React.Fragment>
                    {!excludeGlobalStyles && <GlobalStyle />}
                    {children}
                </React.Fragment>
            </SCThemeProvider>
        );
    }
}
