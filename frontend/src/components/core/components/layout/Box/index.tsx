import * as React from "react";
import styled, {
    css,
    FlattenInterpolation,
    InterpolationValue,
    ThemedStyledProps
} from "styled-components";
import {
    responsiveConditionalStyle,
    responsiveStyle,
    style
} from "../../../utils/css";
import { cssFactory } from "../../../utils/styled-components";

import { Theme } from "../../../theme/index";
import * as _Color from "../../../types/color";
import * as _CSS from "../../../types/css";
import * as _Element from "../../../types/element";
import * as _Shape from "../../../types/shape";
import * as _Size from "../../../types/space";
import { LazyResponsive } from "../../../utils/responsive";

import { alignItems } from "../../../utils/respondTo";
import { getBorder, getMargin, getPadding } from "./utils";

export type Border = boolean | string;

interface StyledProps {
    /**
     * This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
     */
    alignContent?: LazyResponsive<_CSS.AlignContent>;

    /**
     * This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the `justifyContent` version for the cross-axis (perpendicular to the main-axis).
     */
    alignItems?: LazyResponsive<_CSS.AlignItems>;

    /**
     * This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
     */
    alignSelf?: LazyResponsive<_CSS.AlignSelf>;

    /**
     * Applies border on all sides.
     */
    b?: LazyResponsive<Border>;

    /**
     * Applies a bottom border.
     */
    bb?: LazyResponsive<Border>;

    /**
     * Applies a left border.
     */
    bl?: LazyResponsive<Border>;

    /**
     * Applies a right border.
     */
    br?: LazyResponsive<Border>;

    /**
     * Applies a top border.
     */
    bt?: LazyResponsive<Border>;

    /**
     * Background color.
     */
    backgroundColor?: LazyResponsive<_Color.AnyColor>;

    /**
     * Defaults to `Box.Color.Gray4`.
     */
    borderColor: _Color.AnyColor;

    /**
     * Sets the border width.
     */
    borderStrokeWidth?: string;

    /**
     * Defaults to `Box.BorderStyled.Solid`.
     */
    borderStyle: _CSS.BorderStyle;

    /**
     * Accepts any React node
     */
    children?: React.ReactNode;

    /**
     * Corner/border radius, using theme keywords
     */
    cornerRadius?: LazyResponsive<_Shape.CornerRadius>;

    /**
     * Custom css (via styled-components/css)
     */
    css?:
        | string
        | InterpolationValue[]
        | FlattenInterpolation<ThemedStyledProps<Props, Theme>>;

    /**
     * CSS [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display). Accepts `<Responsive>` values. Keyword values are `none`, `block`, `flex`, `inline-block`, `inline-flex`, `inline`, and `inherit`. `<div>` (default element) defaults to `block`.
     */
    display?: LazyResponsive<_CSS.Display>;

    /**
     * This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or height property".
     */
    flexBasis?: LazyResponsive<_CSS.FlexBasis>;

    /**
     * Sets the main axis and direction.
     */
    flexDirection?: LazyResponsive<_CSS.FlexDirection>;

    /**
     * This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).
     */
    flexGrow?: LazyResponsive<number>;

    /**
     * This defines the ability for a flex item to shrink if necessary.
     */
    flexShrink?: LazyResponsive<number>;

    /**
     * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.
     */
    flexWrap?: LazyResponsive<_CSS.FlexWrap>;

    /**
     * Sets `height: 100%`
     */
    fluidHeight?: LazyResponsive<boolean>;

    /**
     * Sets `width: 100%`
     */
    fluidWidth?: LazyResponsive<boolean>;

    /**
     * This defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
     */
    justifyContent?: LazyResponsive<_CSS.JustifyContent>;

    /**
     * Applies margin to all sides.
     */
    m?: LazyResponsive<_Size.Units>;

    /**
     * Applies bottom margin.
     */
    mb?: LazyResponsive<_Size.Units>;

    /**
     * Applies horizontal margin.
     */
    mh?: LazyResponsive<_Size.Units>;

    /**
     * Applies left margin.
     */
    ml?: LazyResponsive<_Size.Units>;

    /**
     * Applies right margin.
     */
    mr?: LazyResponsive<_Size.Units>;

    /**
     * Applies top margin.
     */
    mt?: LazyResponsive<_Size.Units>;

    /**
     * Applies vertical margin.
     */
    mv?: LazyResponsive<_Size.Units>;

    /**
     * Callback function for Box click.
     */
    onClick?: ((e: React.MouseEvent<HTMLElement>) => void);

    /**
     * Callback function for Box mouseEnter.
     */
    onMouseEnter?: ((e: React.MouseEvent<HTMLElement>) => void);

    /**
     * Callback function for Box mouseLeave.
     */
    onMouseLeave?: ((e: React.MouseEvent<HTMLElement>) => void);

    /**
     * By default, flex items are laid out in the source order. However, the order property controls the order in which they appear in the flex container.
     */
    order?: LazyResponsive<number>;

    /**
     * CSS [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). Accepts `<Responsive>` values.
     */
    overflow?: LazyResponsive<_CSS.Overflow>;

    /**
     * Applies padding to all sides.
     */
    p?: LazyResponsive<_Size.Units>;

    /**
     * Applies left padding.
     */
    pl?: LazyResponsive<_Size.Units>;

    /**
     * Applies right padding.
     */
    pr?: LazyResponsive<_Size.Units>;

    /**
     * Applies top padding.
     */
    pt?: LazyResponsive<_Size.Units>;

    /**
     * Applies bottom padding.
     */
    pb?: LazyResponsive<_Size.Units>;

    /**
     * Applies vertical padding.
     */
    pv?: LazyResponsive<_Size.Units>;

    /**
     * Applies horizontal padding.
     */
    ph?: LazyResponsive<_Size.Units>;

    /**
     * CSS [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position). Accepts `<Responsive>` values.
     */
    position?: LazyResponsive<_CSS.Position>;

    /**
     * Horizontal alignment of an inline or table-cell box. `<Text>` should still be used to compose text.
     * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) for more info.
     * Accepts `<Responsive>` values.
     */
    textAlign?: LazyResponsive<_CSS.TextAlign>;

    /**
     * Vertical alignment of an inline or table-cell box.
     * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more info.
     * Accepts `<Responsive>` values.
     */
    verticalAlign?: LazyResponsive<_CSS.VerticalAlign>;
}

export interface Props extends StyledProps {
    /**
     * The HTML element the `<Box>` is rendered as.
     */
    el?: _Element.Box;
}

/**
 * `<Box>` is a low-level layout component that provides a lot of functionality and flexibility. Using `<Box>`, you can add layout spacing (margin & padding), apply background and border styling, use flexbox layout properties, and apply custom CSS when needed.
 */
export class Box extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        el: _Element.Box.Div,
        borderColor: _Color.AnyColor.Gray8,
        borderStyle: _CSS.BorderStyle.Solid
    };

    public static AlignContent = _CSS.AlignContent;
    public static AlignItems = _CSS.AlignItems;
    public static AlignSelf = _CSS.AlignSelf;
    public static BackgroundColor = _Color.AnyColor;
    public static BorderColor = _Color.AnyColor;
    public static BorderStyle = _CSS.BorderStyle;
    public static CornerRadius = _Shape.CornerRadius;
    public static Display = _CSS.Display;
    public static Element = _Element.Box;
    public static FlexDirection = _CSS.FlexDirection;
    public static FlexWrap = _CSS.FlexWrap;
    public static JustifyContent = _CSS.JustifyContent;
    public static Overflow = _CSS.Overflow;
    public static Position = _CSS.Position;
    public static TextAlign = _CSS.TextAlign;
    public static VerticalAlign = _CSS.VerticalAlign;

    public render() {
        const props = {
            alignContent: this.props.alignContent,
            alignItems: this.props.alignItems,
            alignSelf: this.props.alignSelf,
            b: this.props.b,
            backgroundColor: this.props.backgroundColor,
            bb: this.props.bb,
            bl: this.props.bl,
            borderColor: this.props.borderColor,
            borderStrokeWidth: this.props.borderStrokeWidth,
            borderStyle: this.props.borderStyle,
            br: this.props.br,
            bt: this.props.bt,
            children: this.props.children,
            cornerRadius: this.props.cornerRadius,
            css: this.props.css,
            display: this.props.display,
            flexBasis: this.props.flexBasis,
            flexDirection: this.props.flexDirection,
            flexGrow: this.props.flexGrow,
            flexWrap: this.props.flexWrap,
            fluidHeight: this.props.fluidHeight,
            fluidWidth: this.props.fluidWidth,
            justifyContent: this.props.justifyContent,
            m: this.props.m,
            mb: this.props.mb,
            mh: this.props.mh,
            ml: this.props.ml,
            mr: this.props.mr,
            mt: this.props.mt,
            mv: this.props.mv,
            onClick: this.props.onClick,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave,
            order: this.props.order,
            overflow: this.props.overflow,
            p: this.props.p,
            pb: this.props.pb,
            ph: this.props.ph,
            pl: this.props.pl,
            position: this.props.position,
            pr: this.props.pr,
            pt: this.props.pt,
            pv: this.props.pv,
            textAlign: this.props.textAlign,
            verticalAlign: this.props.verticalAlign
        };

        switch (this.props.el) {
            case _Element.Box.Address:
                return <Address {...props} />;
            case _Element.Box.Article:
                return <Article {...props} />;
            case _Element.Box.Aside:
                return <Aside {...props} />;
            case _Element.Box.Div:
                return <Div {...props} />;
            case _Element.Box.Footer:
                return <Footer {...props} />;
            case _Element.Box.Form:
                return <Form {...props} />;
            case _Element.Box.Header:
                return <Header {...props} />;
            case _Element.Box.Main:
                return <Main {...props} />;
            case _Element.Box.Nav:
                return <Nav {...props} />;
            case _Element.Box.Section:
                return <Section {...props} />;
            default:
                return <Div {...props} />;
        }
    }
}

const styles = cssFactory<StyledProps>(css)`
    ${alignItems}
    ${props => {
        const {
            alignContent,
            alignSelf,
            backgroundColor,
            cornerRadius,
            display,
            flexBasis,
            flexDirection,
            flexGrow,
            flexWrap,
            fluidHeight,
            fluidWidth,
            justifyContent,
            order,
            overflow,
            position,
            textAlign,
            theme,
            verticalAlign
        } = props;
        const s = [];
        s.push(
            responsiveStyle("alignContent", alignContent, theme),
            responsiveStyle("alignSelf", alignSelf, theme),
            responsiveStyle(
                "backgroundColor",
                backgroundColor,
                theme,
                (c: _Color.AnyColor) => theme.colors[c]
            ),
            responsiveStyle(
                "borderRadius",
                cornerRadius,
                theme,
                (cr: _Shape.CornerRadius) => theme.cornerRadii[cr]
            ),
            style("boxSizing", "border-box"),
            responsiveStyle("display", display, theme),
            responsiveStyle(
                "flexBasis",
                flexBasis,
                theme,
                (fb: _CSS.FlexBasis) =>
                    typeof fb === "number" ? theme.units.getValue(fb) : fb
            ),
            responsiveStyle("flexDirection", flexDirection, theme),
            responsiveStyle("flexGrow", flexGrow, theme),
            responsiveStyle("flexWrap", flexWrap, theme),
            responsiveConditionalStyle(
                "height",
                fluidHeight,
                "100%",
                "initial",
                theme
            ),
            responsiveStyle("justifyContent", justifyContent, theme),
            responsiveStyle("order", order, theme),
            responsiveStyle("overflow", overflow, theme),
            responsiveStyle("position", position, theme),
            responsiveStyle("textAlign", textAlign, theme),
            responsiveStyle("verticalAlign", verticalAlign, theme),
            responsiveConditionalStyle(
                "width",
                fluidWidth,
                "100%",
                "initial",
                theme
            ),
            getPadding(props),
            getMargin(props),
            getBorder(props)
        );
        return s.join(";\n");
    }}
    ${props => props.css};
`;

const Address = styled.address`
    ${styles};
`;
const Article = styled.article`
    ${styles};
`;
const Aside = styled.aside`
    ${styles};
`;
const Div = styled.div`
    ${styles};
`;
const Footer = styled.footer`
    ${styles};
`;
const Form = styled.form`
    ${styles};
`;
const Header = styled.header`
    ${styles};
`;
const Main = styled.main`
    ${styles};
`;
const Nav = styled.nav`
    ${styles};
`;
const Section = styled.section`
    ${styles};
`;
