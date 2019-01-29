import { AnyColor as Color } from "../../../types/color";
import { VerticalAlign } from "../../../types/css";
import { Size } from "../../../types/icon";
import { LazyResponsive } from "../../../utils/responsive";

export interface InnerProps {
    /**
     * Sets color.
     */
    color?: Color;

    /**
     * Size of icon. Defaults to `Icon.Size.Xs`. Accepts enum or responsive enums (e.g. `{ xs: Icon.Size.Md, sm: Icon.Size.Lg }`).
     */
    size?: LazyResponsive<Size>;

    /**
     * CSS [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title).
     * Displays over the icon on hover and is what's read by a screen reader.
     */
    title?: string;

    /**
     * CSS [vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align).
     */
    verticalAlign?: VerticalAlign;
}

export interface Props extends InnerProps {
    /**
     * SVG image
     */
    children: React.ReactElement<{
        height: string;
        width: string;
    }>;

    /**
     * Color default for particular icon.
     */
    color?: Color;
}
