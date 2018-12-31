import buttons from "./buttons";
import colors from "./colors";
import cornerRadii from "./corner-radii";
import field from "./field";
import initBase from "./global/base";
import initFlexboxgrid from "./global/flexboxgrid";
import initFonts from "./global/fonts";
import initNormalize from "./global/normalize";
import responsive from "./responsive";
import strokeWidths from "./stroke-widths";
import text from "./text";
import transitions from "./transitions";
import units from "./units";
import zIndex from "./z-index";

const theme = Object.freeze({
    name: "wilbur",
    buttons,
    colors,
    cornerRadii,
    field,
    responsive,
    strokeWidths,
    text,
    transitions,
    units,
    zIndex
});

// Consider removing *all* global styles and relying on component styling only.
export const initGlobalThemeStyles = () => {
    initBase();
    initFlexboxgrid();
    initFonts();
    initNormalize();
};

export type Theme = typeof theme;

export default theme;
