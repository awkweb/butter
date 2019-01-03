import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Text } from "../../components";
import RootStore from "../../store";

interface HomeProps {
    rootStore: RootStore;
}

class HomePage extends React.Component<HomeProps> {
    render() {
        return (
            <DocumentTitle title="Home">
                <Box>
                    <Text
                        font={Text.Font.Title}
                        size={Text.Size.Xl}
                        weight={Text.Weight.Bold}
                    >
                        Hello, World!
                    </Text>
                </Box>
            </DocumentTitle>
        );
    }
}

export const Home = inject("rootStore")(observer(HomePage));
