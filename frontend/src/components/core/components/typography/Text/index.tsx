import { get } from "lodash";
import * as React from "react";
import styled, { css } from "styled-components";

import { style } from "../../../utils/css";
import { cssFactory } from "../../../utils/styled-components";

import * as _Color from "../../../types/color";
import * as _CSS from "../../../types/css";
import * as _Text from "../../../types/text";
import {
    isResponsive,
    LazyResponsive,
    Responsive
} from "../../../utils/responsive";

import {
    getResponsiveTextSize,
    getResponsiveTextSizeCSS
} from "./responsive-utils";

interface SharedProps {
    /**
     * Sets text alignment.
     */
    align?: _CSS.TextAlign;

    /**
     * If an element is passed, should only contain **inline** elements (`<span>`, `<strong>`, `<em>`, `<b>`, etc.).
     */
    children: React.ReactNode;

    /**
     * Defaults to `Text.Color.Gray1`. Applies text color.
     */
    color: _Color.AnyColor;

    /**
     * Defaults to `El.Div`. The element rendered that contains `children`. Be careful not to nest block-level text elements (`p`, `h1`, etc.) inside text elements.
     */
    el: _Text.Element;

    /**
     * Prevents text wrapping and truncates overflowing text with an ellipsis. Overrides `whiteSpace` prop.
     */
    ellipsis?: boolean;

    /**
     * Specify the font family to use. `Title` should be used for headings and display text,
     * and `Body` for everything else. The font should stay the same regardless of screen size.
     */
    font: _Text.Font;

    /**
     * HTML id pass-through for ARIA purposes.
     */
    id?: string;

    /**
     * Custom line height, overrides theme defaults.
     * Use a plain number to set line-height relative to the text’s size.
     */
    lineHeight?: number;

    /**
     * Specify whether a word can be broken if the line would otherwise be
     * wider than the container
     * See the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap).
     */
    overflowWrap?: _CSS.OverflowWrap;

    /**
     * If rendered as a `<p>` or heading (`<h1>`, `<h2>`), remove default vertical margins.
     */
    noMargin?: boolean;

    /**
     * Prevent user selection of the text.
     */
    noSelect?: boolean;

    /**
     * Text opacity. `0.0` to `1.0`
     */
    opacity?: number;

    /**
     * Text that appears on hover over the element.
     */
    title?: string;

    /**
     * Tracking (letter spacing) options.
     */
    tracking?: _Text.Tracking;

    /**
     * CSS text-transform. See [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) for valid values.
     */
    transform?: _Text.Transform;

    /**
     * CSS vertical-align. See [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for valid values.
     */
    verticalAlign?: _CSS.VerticalAlign;

    /**
     * Defaults to `Text.Weight.Normal`. Sets the weight of the text.
     */
    weight: _Text.Weight;

    /**
     * Determines how whitespace inside an element is handled.
     * See the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     */
    whiteSpace?: _CSS.WhiteSpace;
}

interface StyledProps extends SharedProps {
    responsiveTextSize: Responsive<_Text.Size>;
}

export interface Props extends SharedProps {
    /**
     * Defaults to `Text.Size.Md`. Text size using our typographic scale.
     */
    size: LazyResponsive<_Text.Size>;
}

/**
 * `<Text>` is a fully-featured text component.
 */
export class Text extends React.PureComponent<Props> {
    public static defaultProps: Partial<Props> = {
        color: _Color.AnyColor.Gray1,
        el: _Text.Element.Div,
        font: _Text.Font.Body,
        size: _Text.Size.Md,
        weight: _Text.Weight.Normal
    };

    public static Align = _CSS.TextAlign;
    public static Color = _Color.AnyColor;
    public static Element = _Text.Element;
    public static Font = _Text.Font;
    public static OverflowWrap = _CSS.OverflowWrap;
    public static Size = _Text.Size;
    public static Tracking = _Text.Tracking;
    public static VerticalAlign = _CSS.VerticalAlign;
    public static Weight = _Text.Weight;
    public static WhiteSpace = _CSS.WhiteSpace;

    public render() {
        const props = {
            align: this.props.align,
            children: this.props.children,
            color: this.props.color,
            el: this.props.el,
            ellipsis: this.props.ellipsis,
            font: this.props.font,
            id: this.props.id,
            lineHeight: this.props.lineHeight,
            noMargin: this.props.noMargin,
            noSelect: this.props.noSelect,
            opacity: this.props.opacity,
            overflowWrap: this.props.overflowWrap,
            responsiveTextSize: isResponsive(this.props.size)
                ? this.props.size
                : getResponsiveTextSize(this.props.size),
            title: this.props.title,
            tracking: this.props.tracking,
            transform: this.props.transform,
            verticalAlign: this.props.verticalAlign,
            weight: this.props.weight,
            whiteSpace: this.props.whiteSpace
        };

        switch (this.props.el) {
            case _Text.Element.Span:
                return <Span {...props} />;
            case _Text.Element.P:
                return <P {...props} />;
            case _Text.Element.Label:
                return <Label {...props} />;
            case _Text.Element.H1:
                return <H1 {...props} />;
            case _Text.Element.H2:
                return <H2 {...props} />;
            case _Text.Element.H3:
                return <H3 {...props} />;
            case _Text.Element.H4:
                return <H4 {...props} />;
            case _Text.Element.H5:
                return <H5 {...props} />;
            case _Text.Element.H6:
                return <H6 {...props} />;
            case _Text.Element.Div:
            default:
                return <Div {...props} />;
        }
    }
}

const styles = cssFactory<StyledProps>(css)`
    ${props => {
        const {
            align,
            color,
            el,
            ellipsis,
            font,
            lineHeight,
            noMargin,
            noSelect,
            opacity,
            overflowWrap,
            responsiveTextSize,
            theme,
            tracking,
            transform,
            verticalAlign,
            weight,
            whiteSpace
        } = props;
        const s = [];
        s.push(
            style("color", get(theme.colors, color || "")),
            style("display", "block", !!ellipsis),
            style("fontFamily", theme.text.getFont(font)),
            style("fontWeight", theme.text.getWeight(weight!), true, true),
            style("letterSpacing", get(theme.text.tracking, tracking || "")),
            style("lineHeight", lineHeight),
            style("margin", noMargin ? "0" : theme.text.getMargin(el!)),
            style("opacity", opacity),
            style("overflowWrap", overflowWrap),
            style("overflow", "hidden", !!ellipsis),
            style("position", "relative"),
            style("textAlign", align),
            style("textOverflow", "ellipsis", !!ellipsis),
            style("textTransform", transform),
            style("transition", theme.transitions.default),
            style("userSelect", "none", !!noSelect),
            style("verticalAlign", verticalAlign),
            style("whiteSpace", ellipsis ? "nowrap" : whiteSpace),
            getResponsiveTextSizeCSS(responsiveTextSize, theme)
        );
        return s.join(";\n");
    }}

    strong, b {
        font-weight: ${props => props.theme.text.getWeight(_Text.Weight.Bold)};
    }

    small {
        font-size: ${props => props.theme.text.getSize(_Text.Size.Sm)};
    }
`;

const Div = styled.div`
    ${styles};
`;
const Span = styled.span`
    ${styles};
`;
const P = styled.p`
    ${styles};
`;
const Label = styled.label`
    ${styles};
`;
const H1 = styled.h1`
    ${styles};
`;
const H2 = styled.h2`
    ${styles};
`;
const H3 = styled.h3`
    ${styles};
`;
const H4 = styled.h4`
    ${styles};
`;
const H5 = styled.h5`
    ${styles};
`;
const H6 = styled.h6`
    ${styles};
`;
