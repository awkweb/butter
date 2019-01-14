import { Size } from "../types/icon";

export const ICON_SIZES = {
    [Size.Xxs]: 1,
    [Size.Xs]: 2,
    [Size.Sm]: 3,
    [Size.Md]: 4,
    [Size.Lg]: 5,
    [Size.Xl]: 6
};

const getSize = (size: Size) => {
    return `${ICON_SIZES[size]}rem !important;`;
};

const icon = Object.freeze({
    getSize
});

export type Icon = typeof icon;
export default icon;
