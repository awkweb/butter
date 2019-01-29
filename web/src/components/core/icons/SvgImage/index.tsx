import * as React from "react";

import styled from "styled-components";

import { Theme } from "../../../theme";
import { AnyColor as Color } from "../../../types/color";
import { Units } from "../../../types/space";

import { responsiveStyle } from "../../../utils/css";
import { LazyResponsive } from "../../../utils/responsive";
import { styledFactory } from "../../../utils/styled-components";

interface Props {
    /**
     *  SVG element to render within this SvgImage
     */
    children: React.ReactElement<{
        height: string;
        width: string;
    }>;

    /**
     * Sets color.
     */
    color?: Color;

    /**
     * Height of image. Lazy responsive Units (e.g. `16`) or string (e.g. `100px`).
     */
    height?: LazyResponsive<Units | string>;

    /**
     * Width of image. Lazy responsive Units (e.g. `16`) or string (e.g. `100px`).
     */
    width?: LazyResponsive<Units | string>;
}

interface StyledProps {
    svgColor?: Props["color"];
    svgHeight?: Props["height"];
    svgWidth?: Props["width"];
}

export class SvgImage extends React.PureComponent<Props> {
    public static Color = Color;

    public render() {
        const { children, color, height, width } = this.props;

        return (
            <StyledSvgImage
                svgColor={color}
                svgHeight={height}
                svgWidth={width}
            >
                {React.cloneElement(children, {
                    height: "100%",
                    width: "100%"
                })}
            </StyledSvgImage>
        );
    }
}

const getColor = (color: Color, theme: Theme) => {
    return theme.colors[color];
};

const getDimensionValue = (dimension: Units | string, theme: Theme) => {
    if (typeof dimension === "string") {
        return dimension;
    }
    return theme.units.getValue(dimension);
};

const StyledSvgImage = styledFactory<StyledProps>(styled.span)`
    display: flex;
    &, svg {
        ${props =>
            responsiveStyle(
                "height",
                props.svgHeight,
                props.theme,
                (value: Units | string) => getDimensionValue(value, props.theme)
            )}
        ${props =>
            responsiveStyle(
                "width",
                props.svgWidth,
                props.theme,
                (value: Units | string) => getDimensionValue(value, props.theme)
            )}
    }
    svg {
        align-self: center;
        fill: ${props => getColor(props.svgColor, props.theme)};
        * {
            transition: ${props => props.theme.transitions.default};
            vector-effect: non-scaling-stroke;
        }
    }
`;
