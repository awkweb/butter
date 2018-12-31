import { Units } from "./space";

export enum AlignContent {
    FlexStart = "flex-start",
    FlexEnd = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch"
}

export enum AlignItems {
    FlexStart = "flex-start",
    FlexEnd = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch"
}

export enum AlignSelf {
    Auto = "auto",
    FlexStart = "flex-start",
    FlexEnd = "flex-end",
    Center = "center",
    Baseline = "baseline",
    Stretch = "stretch"
}

export enum BorderStyle {
    None = "none",
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}

export enum Display {
    Block = "block",
    Flex = "flex",
    Inherit = "inherit",
    InlineBlock = "inline-block",
    InlineFlex = "inline-flex",
    Inline = "inline",
    None = "none"
}

export enum SimpleDisplay {
    Block = "block",
    None = "none"
}

export type FlexBasis = Units | string | "auto";

export enum FlexDirection {
    Row = "row",
    RowReverse = "row-reverse",
    Column = "column",
    ColumnReverse = "column-reverse"
}

export enum FlexWrap {
    NoWrap = "nowrap",
    Wrap = "wrap",
    WrapReverse = "wrap-reverse"
}

export enum JustifyContent {
    FlexStart = "flex-start",
    FlexEnd = "flex-end",
    Center = "center",
    SpaceBetween = "space-between",
    SpaceAround = "space-around",
    SpaceEvenly = "space-evenly"
}

export enum Overflow {
    Visible = "visible",
    Hidden = "hidden",
    Scroll = "scroll",
    Auto = "auto"
}

export enum OverflowWrap {
    Normal = "normal",
    BreakWord = "break-word",
    Inherit = "inherit",
    Unset = "unset",
    Initial = "initial"
}

export enum Position {
    State = "static",
    Relative = "relative",
    Absolute = "absolute",
    Fixed = "fixed"
}

export enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right"
}

export enum VerticalAlign {
    Baseline = "baseline",
    Sub = "sub",
    Super = "super",
    TextTop = "text-top",
    TextBottom = "text-bottom",
    Middle = "middle",
    Top = "top",
    Bottom = "bottom"
}

export enum WhiteSpace {
    Normal = "normal",
    NoWrap = "nowrap",
    Pre = "pre",
    PreLine = "pre-line",
    PreWrap = "pre-wrap"
}
