import units from "./units";

import { Element, Font, Size, Weight } from "../types/text";

export const TEXT_SIZES = {
    [Size.Xxs]: 0.625,
    [Size.Xs]: 0.75,
    [Size.Sm]: 0.875,
    [Size.Md]: 1,
    [Size.Lg]: 1.125,
    [Size.Xl]: 1.25,
    [Size.Xxl]: 1.5,
    [Size.Xxxl]: 1.875,
    [Size.Xxxxl]: 2.25,
    [Size.Xxxxxl]: 3
};

const WEIGHTS = {
    [Weight.Thin]: 100,
    [Weight.Light]: 300,
    [Weight.Normal]: 400,
    [Weight.Medium]: 500,
    [Weight.SemiBold]: 600,
    [Weight.Bold]: 700,
    [Weight.Heavy]: 800,
    [Weight.Black]: 900
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
