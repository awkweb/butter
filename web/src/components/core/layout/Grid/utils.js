import { getBreakpoint, getValue } from '@/components/utils/css'

export const paddingAtBreakpoint = (breakpoint, ph, pv) => {
    if (ph === 0 && pv === 0) {
        return ''
    }
    return `
        ${
            ph
                ? `
            @media only screen and (min-width: ${getBreakpoint(
                breakpoint,
            )}rem) {
                padding-left: ${getValue(ph)};
                padding-right: ${getValue(ph)};
            }
        `
                : ''
        }
        ${
            /*
             * padding-bottom subtracts 2 units from the bottom padding to account for
             * padding from <Row> components
             */
            pv
                ? `
            @media only screen and (min-width: ${getBreakpoint(
                breakpoint,
            )}rem) {
                padding-top: ${getValue(pv)};
                padding-bottom: ${getValue(pv - 2)};
            }
        `
                : ''
        }
    `
}
