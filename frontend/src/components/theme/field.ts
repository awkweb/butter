import { AnyColor as Color } from "../types/color";
import { Colors } from "./colors";
import { strokeWidths } from "./stroke-widths";

const getBorderColor = (colorName: Color, colors: Colors) => colors[colorName];

const getBorderWidth = () => strokeWidths.default;

const getBorderStyle = (
    colorName: Color,
    colors: Colors,
    error: boolean
): string => {
    return `${getBorderWidth()} solid ${
        error ? colors[Color.Error] : getBorderColor(colorName, colors)
    }`;
};

const getFocusStyles = (
    colorName: Color,
    colors: Colors,
    error: boolean
): string => {
    return getBorderStyle(colorName, colors, error);
};

const field = Object.freeze({
    getBorderStyle,
    getFocusStyles,

    padding: {
        sm: [1, 2],
        md: [1.5, 3]
    }
});

export type Field = typeof field;
export default field;
