import {
    FlattenInterpolation,
    Interpolation,
    InterpolationValue,
    SimpleInterpolation,
    StyledComponentClass,
    ThemedStyledProps
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

type Attrs<P, A extends Partial<P>, T> = {
    [K in keyof A]: ((props: ThemedStyledProps<P, T>) => A[K]) | A[K]
};

interface ThemedStyledFunction<Props extends object> {
    <U = {}>(
        strings: TemplateStringsArray,
        ...interpolations: Array<
            Interpolation<ThemedStyledProps<Props & U, Theme>>
        >
    ): StyledComponentClass<Props & U, Theme>;
    attrs<U, A extends Partial<Props & U> = {}>(
        attrs: Attrs<Props & U, A, Theme>
    ): ThemedStyledFunction<Props & A & U>;
}

export const styledFactory = <Props extends object>(
    styledFn: ThemedStyledFunction<any>
): ThemedStyledFunction<Props & React.HTMLAttributes<any>> => {
    return styledFn;
};

interface ThemedCssFunction<Props extends object> {
    (
        strings: TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): InterpolationValue[];
    (
        strings: TemplateStringsArray,
        ...interpolations: Array<Interpolation<ThemedStyledProps<Props, Theme>>>
    ): Array<FlattenInterpolation<ThemedStyledProps<Props, Theme>>>;
}

export const cssFactory = <Props extends object>(
    cssFn: ThemedCssFunction<any>
): ThemedCssFunction<Props> => {
    return cssFn;
};
