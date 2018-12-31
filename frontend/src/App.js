import React, { Component } from "react";
import Text from "./components/core/typography/Text";
import { ThemeProvider } from "./components/core/theme/ThemeProvider";

class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <div className="App">
                    <Text color={Text.Color.Primary} size={Text.Size.Md}>
                        merp
                    </Text>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
