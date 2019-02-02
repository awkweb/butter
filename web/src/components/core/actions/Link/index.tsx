import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

import { AnyColor as Color } from "../../../types/color";
import * as _Text from "../../../types/text";
import { style } from "../../../utils/css";
import { LazyResponsive } from "../../../utils/responsive";
import { cssFactory } from "../../../utils/styled-components";
import { Text } from "../../typography/Text";

interface Props {
    /**
     * Defaults to `Color.Gray1`.
     */
    color: Color;

    /**
     * If an element is passed, should only contain **inline** elements (`<span>`, `<strong>`, `<em>`, `<b>`, etc.).
     */
    children: string | JSX.Element | JSX.Element[];

    /**
     * Applies `text-decoration`.
     */
    decoration: boolean;

    /**
     * Applies disabled styling to the link.
     */
    disabled: boolean;

    /**
     * HTML id property.
     */
    id?: string;

    /**
     * Defaults to `Size.Md`. Size enum or Responsive size enum.
     */
    size: LazyResponsive<_Text.Size>;

    /**
     * Link destination. When provided, an `<a>` is rendered in place of `<button>`.
     */
    to: string | object;

    /**
     * Defaults to `Weight.Normal`. Sets the weight of the text.
     */
    weight: _Text.Weight;
}

/**
 * Use `<Link>` to navigate the site. (Wraps react-router's [`Link`](https://reacttraining.com/react-router/web/api/Link) component.)
 */
export class Link extends React.Component<Props> {
    public static Color = Color;
    public static Size = _Text.Size;
    public static Weight = _Text.Weight;

    public static defaultProps = {
        color: Color.Gray1,
        decoration: false,
        disabled: false,
        size: _Text.Size.Md,
        weight: _Text.Weight.Normal
    };

    public render() {
        const {
            children,
            color,
            decoration,
            disabled,
            id,
            size,
            to,
            weight
        } = this.props;

        const commonProps = {
            color,
            disabled,
            id,
            to,
            tabIndex: disabled ? -1 : 0
        };
        // this hack explained here: https://github.com/styled-components/styled-components/issues/1198
        const textDecoration = decoration ? "underline" : "none";

        return (
            <StyledAnchor {...commonProps} style={{ textDecoration }}>
                <Text
                    color={color}
                    el={Text.Element.Span}
                    size={size}
                    weight={weight}
                >
                    {children}
                </Text>
            </StyledAnchor>
        );
    }
}

interface StyledAnchorProps {
    color: Color;
    disabled: boolean;
}

const styles = cssFactory<StyledAnchorProps>(css)`
    ${props => style("color", props.theme.colors[props.color])};
    ${props => style("opacity", 0.35, props.disabled)};
    ${props => style("pointerEvents", "none", props.disabled)};
    ${props => style("userSelect", "none", props.disabled)};
    outline: none;
`;

const StyledAnchor = styled(RouterLink)`
    ${styles};
`;
