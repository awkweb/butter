import * as React from "react";
import styled, { css } from "styled-components";
import { style } from "../../../utils/css";
import { Box } from "../../layout/Box";
import { cssFactory } from "../../../utils/styled-components";
import { AnyColor as Color } from "../../../types/color";

interface SharedProps {
    /**
     * Defaults to `Field.Color.Gold3`.
     */
    color: Color;

    /**
     * Center loader in container.
     */
    center: boolean;
}

/**
 * Use `<Loader>` while there is a large amount of content not ready for viewing.
 */
export class Loader extends React.Component<SharedProps> {
    public static Color = Color;

    public static defaultProps = { color: Color.Gold3, center: true };

    public render() {
        const { color, center } = this.props;

        return (
            <Box
                display={Box.Display.Flex}
                justifyContent={center ? Box.JustifyContent.Center : undefined}
                pt={3}
            >
                {[0, 1, 2].map(v => (
                    <StyledLoader color={color} key={v} />
                ))}
            </Box>
        );
    }
}

interface LoaderProps {
    color: Color;
}

const loaderStyles = cssFactory<LoaderProps>(css)`
    @keyframes loader {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0.1;
            transform: translateY(-1rem);
        }
    }
    animation: loader .6s infinite alternate;
    ${props => style("background", props.theme.colors[props.color])};
    border-radius: 50%;
    height: 1rem;
    margin: 0 0.2rem;
    width: 1rem;
    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

const StyledLoader = styled.div`
    ${loaderStyles}
`;
