import { createGlobalStyle } from "styled-components";

import buttons from "./buttons";
import colors from "./colors";
import cornerRadii from "./corner-radii";
import field from "./field";
import base from "./global/base";
import flexboxgrid from "./global/flexboxgrid";
import normalize from "./global/normalize";
import reactDates from "./global/react-dates";
import reactSelect from "./global/react-select";
import icon from "./icon";
import responsive from "./responsive";
import strokeWidths from "./stroke-widths";
import text from "./text";
import transitions from "./transitions";
import units from "./units";
import zIndex from "./z-index";

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    ${flexboxgrid}
    ${base}
    ${reactDates}
    ${reactSelect}
`;

const theme = Object.freeze({
    name: "wilbur",
    buttons,
    colors,
    cornerRadii,
    field,
    icon,
    responsive,
    strokeWidths,
    text,
    transitions,
    units,
    zIndex
});

export type Theme = typeof theme;

export default theme;
