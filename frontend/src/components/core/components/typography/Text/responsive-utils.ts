import { mapValues } from "lodash";

import { Theme } from "../../../theme/index";
import { Size as TextSize } from "../../../types/text";
import { Responsive } from "../../../utils/responsive";

/**
 * If autoScale is true, limit text size at the xs breakpoint to AUTO_MOBILE_MAX_SIZE
 */
export const getResponsiveTextSize = (size: TextSize) => {
    return { xs: size };
};

/**
 * Transform Responsive<TextSize> to responsive CSS.
 */
export const getResponsiveTextSizeCSS = (
    textSizeByBreakpoint: Responsive<TextSize>,
    theme: Theme
) => {
    const textSizeCSSByBreakpoint: any = mapValues(
        textSizeByBreakpoint,
        size => {
            return theme.text.getSize(size!);
        }
    );
    return theme.responsive.cssPropsForBreakpointValues(
        textSizeCSSByBreakpoint,
        "font-size",
        true
    );
};
