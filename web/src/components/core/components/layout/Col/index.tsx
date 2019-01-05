import * as React from "react";
import styled, { css } from "styled-components";
import { BREAKPOINT_NAMES } from "../../../theme/responsive";
import { AlignSelf, SimpleDisplay as Display } from "../../../types/css";
import { alignSelf, order } from "../../../utils/respondTo";
import { Responsive } from "../../../utils/responsive";
import { styledFactory } from "../../../utils/styled-components";
import { Box } from "../Box";

type ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Order = "unset" | number;

export interface Props {
    /**
     * How to align the column
     */
    alignSelf?: AlignSelf;

    children?: React.ReactNode;

    /**
     * Styles the columns with a background color and border for debugging.
     */
    debug?: boolean;

    /**
     * Responsive way to show/hide columns
     */
    display?: Responsive<Display>;

    /**
     * Fills the outer contiainer height
     * Default: false
     */
    fluidHeight?: boolean;

    /**
     * Moves columns to the right by adding left margin in increments of
     * column widths, according to relative breakpoints.
     */
    offset?: Responsive<ColumnRange>;

    /**
     * Move the column to display in a different spot
     */
    order?: Responsive<Order>;

    /**
     * The number of columns to fill at breakpoint xs and above. Must be an
     * integer between 0 and 12.
     */
    xs?: ColumnRange;

    /**
     * The number of columns to fill at breakpoint sm and above. Must be an
     * integer between 0 and 12.
     */
    sm?: ColumnRange;

    /**
     * The number of columns to fill at breakpoint md and above. Must be an
     * integer between 0 and 12.
     */
    md?: ColumnRange;

    /**
     * The number of columns to fill at breakpoint lg and above. Must be an
     * integer between 0 and 12.
     */
    lg?: ColumnRange;

    /**
     * The number of columns to fill at breakpoint xl and above. Must be an
     * integer between 0 and 12.
     */
    xl?: ColumnRange;

    /**
     * Whether or not to include padding on the bottom of the column
     */
    bottomPadding: boolean;
}

/**
 * Use `<Col>` to organize content within a `<Row>`, with the option to modify that organization at various viewport breakpoints. The component uses global `flexboxgrid` classes and is modeled off of [Bootstrap’s CSS grid](http://getbootstrap.com/css/#grid).
 *
 * See [`<Grid>`](/#/Layout/Grid) for examples.
 */
export class Col extends React.Component<Props> {
    /**
     * An enum for aligning yourself
     */
    public static AlignSelf = AlignSelf;
    public static Display = Display;

    public static defaultProps = {
        bottomPadding: true
    };

    public render() {
        const {
            alignSelf: alignSelfProp,
            children,
            debug,
            display: displayProp,
            fluidHeight,
            offset,
            order: orderProp,
            bottomPadding
        } = this.props;

        const classnames = BREAKPOINT_NAMES.map(breakpoint => {
            let classes = "";
            if (this.props[breakpoint]) {
                classes += `col-${breakpoint}-${this.props[breakpoint]} `;
            }

            if (offset && offset[breakpoint]) {
                classes += `col-${breakpoint}-offset-${offset[breakpoint]} `;
            }

            return classes;
        }).join(" ");

        return (
            <StyledCol
                alignSelf={alignSelfProp}
                className={classnames}
                debug={debug}
                order={orderProp}
                display={displayProp}
            >
                <Box fluidHeight={fluidHeight} pb={bottomPadding ? 2 : 0}>
                    {children}
                </Box>
            </StyledCol>
        );
    }
}

export const StyledCol = styledFactory<
    Pick<Props, "alignSelf" | "order" | "debug" | "display">
>(styled.div)`
    ${alignSelf};
    ${order};
    ${props =>
        props.debug &&
        css`
            background-color: ${props.theme.colors.blue5};
            border: ${props.theme.strokeWidths.default} solid
                ${props.theme.colors.blue4};
        `};
`;
