import { AnyColor as Color } from "../../../types/color";
import { Colors } from "../../../theme/colors";

const getBorderColor = (colorName: Color, colors: Colors) => colors[colorName];

const getBorderWidth = () => "1px";

export const getBorderStyle = (
    colorName: Color,
    colors: Colors,
    noBorder?: boolean
): string => {
    return noBorder
        ? `none`
        : `${getBorderWidth()} solid ${getBorderColor(colorName, colors)}`;
};
