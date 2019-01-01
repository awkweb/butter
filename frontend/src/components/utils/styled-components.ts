import {
    CSSObject,
    FlattenInterpolation,
    Interpolation,
    SimpleInterpolation,
    ThemedStyledProps,
    FlattenSimpleInterpolation,
    InterpolationFunction,
    ThemedStyledFunction
} from "styled-components";
import { Theme } from "../theme/index";

/**
 * Adds type support for custom component Props and active Theme
 * to styled-components’ `styled` and `css`.
 *
 * Usage:
 * ```jsx
 * import { styledFactory, cssFactory } from './styled-components'
 * import styled, {css} from 'styled-components'
 *
 * const bgColor = cssFactory<Props>(css)`
 *   background-color: ${props => props.theme.colors['red']};
 * `
 *
 * const RedRect = styledFactory<Props>(styled.div)`
 *   ${bgColor}
 * `
 * ```
 */

export const styledFactory = <Props extends object>(
    styledFn: ThemedStyledFunction<any, any>
): ThemedStyledFunction<React.ComponentType<any>, Theme, Props> => {
    return styledFn;
};

interface ThemedCssFunction<Props extends object> {
    (
        first: TemplateStringsArray | CSSObject,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation;
    (
        first:
            | TemplateStringsArray
            | CSSObject
            | InterpolationFunction<ThemedStyledProps<Props, Theme>>,
        ...interpolations: Array<Interpolation<ThemedStyledProps<Props, Theme>>>
    ): FlattenInterpolation<ThemedStyledProps<Props, Theme>>;
}

export const cssFactory = <Props extends object>(
    cssFn: ThemedCssFunction<any>
): ThemedCssFunction<Props> => {
    return cssFn;
};
