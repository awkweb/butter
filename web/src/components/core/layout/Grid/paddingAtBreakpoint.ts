import { css } from "styled-components";

import { Theme } from "../../../theme";
import { Breakpoint } from "../../../utils/responsive";
import { cssFactory } from "../../../utils/styled-components";

export const paddingAtBreakpoint = (
    breakpoint: Breakpoint,
    ph: number,
    pv: number
) => {
    if (ph === 0 && pv === 0) {
        return "";
    }
    return cssFactory<{
        theme: Theme;
    }>(css)`
        ${props => `
        ${
            ph
                ? `
            @media only screen and (min-width: ${props.theme.responsive.getBreakpoint(
                breakpoint
            )}rem) {
                padding-left: ${props.theme.units.getValue(ph)};
                padding-right: ${props.theme.units.getValue(ph)};
            }
        `
                : ""
        }
        ${
            /*
             * padding-bottom subtracts 2 units from the bottom padding to account for
             * padding from <Row> components
             */
            pv
                ? `
            @media only screen and (min-width: ${props.theme.responsive.getBreakpoint(
                breakpoint
            )}rem) {
                padding-top: ${props.theme.units.getValue(pv)};
                padding-bottom: ${props.theme.units.getValue(pv - 2)};
            }
        `
                : ""
        }
    `};
    `;
};
