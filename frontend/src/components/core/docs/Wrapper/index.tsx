import * as React from "react";
import styled from "styled-components";

import { ThemeProvider } from "../../theme/ThemeProvider";

interface Props {
    children: React.ReactNode;
}

class Wrapper extends React.Component<Props> {
    public render() {
        return (
            <StyleWrapper>
                <ThemeProvider>{this.props.children}</ThemeProvider>
            </StyleWrapper>
        );
    }
}

const StyleWrapper = styled.div`
    font-family: "Lato", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
`;

export default Wrapper;
