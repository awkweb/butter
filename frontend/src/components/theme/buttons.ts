import { Color as ButtonColor } from "../types/button";
import { AnyColor } from "../types/color";
import { Colors } from "./colors";
import { strokeWidths } from "./stroke-widths";

const getBackgroundColor = (colorName: ButtonColor, colors: Colors) => {
    return colors[colorName];
};

const getBorderColor = (colorName: ButtonColor, colors: Colors) =>
    getBackgroundColor(colorName, colors);

const getBorderWidth = () => strokeWidths.default;

const getBorderStyle = (colorName: ButtonColor, colors: Colors): string => {
    return `${getBorderWidth()} solid ${getBorderColor(colorName, colors)}`;
};

const getTextColorName = (colorName: ButtonColor): AnyColor => {
    switch (colorName) {
        case ButtonColor.Brand:
        case ButtonColor.Secondary:
            return AnyColor.Gray1;
        default:
            return AnyColor.White;
    }
};

const getLoadingSpinnerColorName = (
    colorName: ButtonColor,
    colors: Colors
): string => {
    return colors[getTextColorName(colorName)];
};

const getTextColor = (colorName: ButtonColor, colors: Colors): string => {
    return colors[getTextColorName(colorName)];
};

const getFocusStyles = (colors: Colors): string => `
    box-shadow: 0 0 8px 0 ${colors[AnyColor.Secondary]};
    outline: none;
`;

const getHoverColorName = (colorName: ButtonColor): AnyColor => {
    switch (colorName) {
        case ButtonColor.Brand:
            return AnyColor.Gold4;
        case ButtonColor.Primary:
            return AnyColor.Blue4;
        case ButtonColor.Success:
            return AnyColor.Green4;
        case ButtonColor.Error:
            return AnyColor.Red4;
        case ButtonColor.Secondary:
        default:
            return AnyColor.Gray9;
    }
};

const getHoverStyles = (colorName: ButtonColor, colors: Colors): string => {
    const color = colors[getHoverColorName(colorName)];
    return `
        background-color: ${color};
        border-color: ${color};
    `;
};

const getActiveColorName = (colorName: ButtonColor): AnyColor => {
    switch (colorName) {
        case ButtonColor.Brand:
            return AnyColor.Gold2;
        case ButtonColor.Primary:
            return AnyColor.Blue2;
        case ButtonColor.Success:
            return AnyColor.Green2;
        case ButtonColor.Error:
            return AnyColor.Red2;
        case ButtonColor.Secondary:
        default:
            return AnyColor.Gray7;
    }
};

const getActiveStyles = (colorName: ButtonColor, colors: Colors): string => {
    const color = colors[getActiveColorName(colorName)];
    return `
        background-color: ${color};
        border-color: ${color};
    `;
};

const buttons = Object.freeze({
    fontWeight: 600,
    getActiveStyles,
    getBackgroundColor,
    getBorderStyle,
    getTextColor,
    getTextColorName,
    getLoadingSpinnerColorName,
    getFocusStyles,
    getHoverStyles,

    padding: {
        sm: [1, 2],
        md: [1.5, 3]
    }
});

export type Buttons = typeof buttons;
export default buttons;
