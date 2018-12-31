import { AnyColor } from "../../../types/color";
import { LazyResponsive, Responsive } from "../../../utils/responsive";
/** Force typing as specific numbers for type hinting purposes */
export const ValidMaxWidths = Object.freeze({
    sm: 64 as 64,
    md: 104 as 104,
    lg: 144 as 144,
    // TODO: remove all usages of this value
    "lg-legacy": 142 as 142
});
type ResponsiveNumber = LazyResponsive<number>;
export type MaxWidth = keyof typeof ValidMaxWidths;

export interface Props {
    /**
     * Set the background color of the outer container of grid, which is
     * 100% width.
     */
    backgroundColor?: AnyColor;
    /**
     * Contents of the grid. Direct children are generally `<Row>`s.
     */
    children?: React.ReactNode;
    /**
     * Maximum width of the grid, in units. `sm: 64`. `md: 96`, `lg: 144`
     */
    maxWidth?: LazyResponsive<MaxWidth>;
    noOverflow?: boolean;
    /**
     * Add padding in units to the grid at various breakpoints. Supercedes
     * props `pv` and `ph`.
     */
    p?: ResponsiveNumber;
    /**
     * Add horizontal padding in units to the grid at various breakpoints.
     * Defaults to 2 units of padding at all sizes.
     */
    ph: ResponsiveNumber;
    /**
     * Add vertical padding in units to the grid at various breakpoints.
     */
    pv?: ResponsiveNumber;
}

export interface InnerProps {
    maxWidth?: Responsive<MaxWidth>;
    p?: Responsive<number>;
    ph: Responsive<number>;
    pv?: Responsive<number>;
}
