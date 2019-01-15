import * as React from "react";
import { Box, Icon } from "../../index";
import { cssFactory } from "../../core/utils/styled-components";
import { css } from "styled-components";
import { getColorForId } from "./utils";

interface Props {
    id: string;
}

export class InstitutionLogo extends React.Component<Props> {
    state = { component: undefined };

    async componentWillMount() {
        const { id } = this.props;
        let component;
        try {
            component = await import(`../../../components/core/components/icons/Icon/svgs/${id}`);
        } catch (e) {
            component = await import("../../../components/core/components/icons/Icon/svgs/bank");
        } finally {
            this.setState({ component: component.default });
        }
    }

    render() {
        const { id } = this.props;
        const { component: Component }: { component: any } = this.state;
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                cornerRadius={Box.CornerRadius.Circle}
                css={genOuterCSS(id)}
                display={Box.Display.Flex}
                justifyContent={Box.JustifyContent.Center}
                mr={2}
            >
                {Component && <Component size={Icon.Size.Sm} />}
            </Box>
        );
    }
}

const genOuterCSS = (id: string) =>
    cssFactory(css)`
    background-color: ${getColorForId(id)};
    height: 2.5rem;
    min-width: 2.5rem;
    * { width: 1.5rem !important; }
`;
