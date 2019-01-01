import { createGlobalStyle } from "styled-components";
import buttons from "./buttons";
import colors from "./colors";
import cornerRadii from "./corner-radii";
import field from "./field";
import base from "./global/base";
import flexboxgrid from "./global/flexboxgrid";
import normalize from "./global/normalize";
import responsive from "./responsive";
import strokeWidths from "./stroke-widths";
import text from "./text";
import transitions from "./transitions";
import units from "./units";
import zIndex from "./z-index";

export const GlobalStyle = createGlobalStyle`
    ${base}
    ${flexboxgrid}
    ${normalize}
`;

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

export type Theme = typeof theme;
export default theme;
