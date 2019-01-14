import * as React from "react";
import styled from "styled-components";

import { AnyColor as Color } from "../../../types/color";
import { VerticalAlign } from "../../../types/css";
import { Size } from "../../../types/icon";
import { Props } from "./types";

import { SvgImage } from "../SvgImage";

import { responsiveConditionalStyle } from "../../../utils/css";
import { convertLazy, transformValues } from "../../../utils/responsive";
import { styledFactory } from "../../../utils/styled-components";
import { ICON_SIZES } from "../../../theme/icon";

export interface WrapperProps extends Pick<Props, "title" | "verticalAlign"> {
    children: React.ReactElement<any>;
}

export class Icon extends React.Component<Props> {
    public static Color = Color;
    public static Size = Size;
    public static VerticalAlign = VerticalAlign;

    public static defaultProps = { color: Color.White, size: Size.Sm };

    public getIconSize() {
        return transformValues(
            convertLazy<Size>(this.props.size!),
            (size: Size) => {
                return ICON_SIZES[size];
            }
        );
    }

    public render() {
        const { children, color, title, verticalAlign } = this.props;

        return (
            <IconWrapper title={title} verticalAlign={verticalAlign}>
                <SvgImage
                    color={color}
                    height={this.getIconSize()}
                    width={this.getIconSize()}
                >
                    {children}
                </SvgImage>
            </IconWrapper>
        );
    }
}

const IconWrapper = styledFactory<WrapperProps>(styled.div)`
    align-self: center;
    align-items: center;
    display: inline-flex;
    vertical-align: ${props => props.verticalAlign || "unset"};
    ${props =>
        responsiveConditionalStyle(
            "height",
            false,
            "100%",
            "unset",
            props.theme
        )};
    ${props =>
        responsiveConditionalStyle(
            "width",
            false,
            "100%",
            "unset",
            props.theme
        )};
`;
