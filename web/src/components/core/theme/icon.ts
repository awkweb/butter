import { Size } from "../types/icon";

export const ICON_SIZES = {
    [Size.Xxs]: 1.65,
    [Size.Xs]: 2,
    [Size.Sm]: 2.5,
    [Size.Md]: 3,
    [Size.Lg]: 4
};

const getSize = (size: Size) => {
    return `${ICON_SIZES[size]}rem !important;`;
};

const icon = Object.freeze({
    getSize
});

export type Icon = typeof icon;
export default icon;
