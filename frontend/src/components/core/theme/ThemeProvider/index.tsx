import PropTypes from "prop-types";
import * as React from "react";

import { ThemeProvider as SCThemeProvider } from "styled-components";
import theme, { initGlobalThemeStyles } from "../../../theme/index";

interface Props {
    children: React.ReactNode;
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

    public componentWillMount() {
        const { excludeGlobalStyles } = this.props;
        if (excludeGlobalStyles) {
            return;
        }
        initGlobalThemeStyles();
    }

    public render() {
        return (
            <SCThemeProvider theme={theme}>
                {this.props.children}
            </SCThemeProvider>
        );
    }
}
