import * as React from "react";
import { withTheme } from "styled-components";

import { Theme } from "../../../theme/index";

interface Props {
    children: (theme: Theme) => React.ReactNode;
    theme: Theme;
}

class WithTheme extends React.Component<Props> {
    public render() {
        return this.props.children(this.props.theme);
    }
}

export const ThemeConsumer = withTheme(WithTheme);
