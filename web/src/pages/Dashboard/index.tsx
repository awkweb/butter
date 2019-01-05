import React from "react";
import { inject, observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Box, Col, Text, Grid, Row } from "../../components";
import RootStore from "../../store";

interface Props {
    rootStore: RootStore;
}

class DashboardClass extends React.Component<Props> {
    render() {
        return (
            <DocumentTitle title="Dashboard | Wilbur">
                <Grid maxWidth="md" ph={{ xs: 2, md: 12 }}>
                    <Row>
                        <Col xs={12} sm={10}>
                            <Box mb={3} mt={12}>
                                <Box
                                    alignItems={Box.AlignItems.Center}
                                    css={`
                                        height: 2.3125rem;
                                    `}
                                    display={Box.Display.Flex}
                                    mb={1}
                                >
                                    <Text
                                        el={Text.Element.H1}
                                        font={Text.Font.Title}
                                        noMargin
                                        size={Text.Size.Xxl}
                                    >
                                        Dashboard
                                    </Text>
                                </Box>
                                <Text size={Text.Size.Sm}>
                                    Here are some custom recommendations and
                                    account stats to help you get things done
                                    tonight.
                                </Text>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const Dashboard = inject("rootStore")(observer(DashboardClass));
