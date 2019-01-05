import units from "./units";

import { Element, Font, Size, Weight } from "../types/text";

export const TEXT_SIZES = {
    xxs: 0.75,
    xs: 0.875,
    sm: 1,
    md: 1.125,
    lg: 1.25,
    xl: 1.5,
    xxl: 1.875,
    xxxl: 2.25,
    xxxxl: 3,
    xxxxxl: 3.75
};

const WEIGHTS = {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
    black: 900
};

export const typeScaleRoot = "16px";

const getFont = (type = Font.Body) => {
    switch (type) {
        case Font.Title:
            return "'Aleo', serif";
        case Font.Body:
        default:
            return "'Lato', sans-serif";
    }
};

const getLineHeight = (size: number) => {
    return size < 2 ? 1.5 : 1.25;
};

const getMargin = (el: Element) => {
    switch (el) {
        case "p":
            return `${units.getValues([1, 0])} !important`;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
            return "1em 0 !important";
        default:
            return "0";
    }
};

const getSize = (size: Size) => {
    return `${TEXT_SIZES[size]}rem !important;`;
};

const getWeight = (weight: Weight): number => {
    return WEIGHTS[weight];
};

const tracking = {
    normal: "normal",
    wide: "0.1em"
};

const text = Object.freeze({
    getFont,
    getLineHeight,
    getMargin,
    getSize,
    getWeight,
    tracking,
    typeScaleRoot
});

export type Text = typeof text;
export default text;
