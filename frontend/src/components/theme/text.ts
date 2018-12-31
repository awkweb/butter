import units from "./units";

import { Element, Size, Weight } from "../types/text";

import weights, { TEXT_SIZES, TEXT_WEIGHTS } from "./typography";

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

const getWeight = (weight: Weight) => {
    if (!TEXT_WEIGHTS.includes(weight)) {
        return weights.normal;
    }

    return weights[weight];
};

const tracking = {
    normal: "normal",
    wide: "0.1em"
};

export default Object.freeze({
    getLineHeight,
    getMargin,
    getSize,
    getWeight,
    tracking
});
