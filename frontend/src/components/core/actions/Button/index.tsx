import * as React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Color, Size } from "../../../types/button";
import {
    responsiveConditionalStyle,
    responsiveStyle
} from "../../../utils/css";
import {
    convertLazy,
    LazyResponsive,
    Responsive
} from "../../../utils/responsive";
import { Box } from "../../layout/Box";
import { ThemeConsumer } from "../../theme/ThemeConsumer";
import { TextAlign } from "../../../types/css";
import { cssFactory, styledFactory } from "../../../utils/styled-components";

interface SharedProps {
    /**
     * When true, `display: block;`. When false, `display: inline-block;`.
     */
    block: boolean;

    /**
     * Accepts a string, element, null, or some combined array of those.
     */
    children?: React.ReactNode;

    /**
     * Defaults to `Button.Color.Secondary`.
     */
    color: Color;

    /**
     * Applies disabled styling to the button.
     */
    disabled: boolean;

    /**
     * Render as a `<div>`
     */
    div?: boolean;

    /**
     * Render the button w/ 100% width.
     */
    fluid: LazyResponsive<boolean>;

    /**
     * HTML id property.
     */
    id?: string;

    /**
     * Render as an `<input>`.
     */
    input?: boolean;

    /**
     * HTML name property. See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/name).
     */
    name?: string;

    /**
     * Remove background color.
     */
    noBackground?: boolean;

    /**
     * Remove border.
     */
    noBorder?: boolean;

    /**
     * Prevent button text from wrapping.
     */
    noWrap?: boolean;

    /**
     * Callback function for button click.
     */
    onClick?: ((e: React.MouseEvent<HTMLElement>) => void) | boolean;

    /**
     * Sets text alignment.
     */
    textAlign?: TextAlign;

    /**
     * Button link destination. When provided, an `<a>` is rendered in place of `<button>`.
     */
    to?: object;

    /**
     * HTML `type` attribute. See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
     */
    type: string;

    /**
     * In conjunction with the `input` prop, sets the button text.
     */
    value?: string;
}
interface Props extends SharedProps {
    /**
     * Renders loading spinner in place of the button label.
     */
    isLoading: boolean;

    /**
     * Defaults to `Button.Size.Md`. Size enum or Responsive size enum.
     */
    size: LazyResponsive<Size>;
}

interface InternalProps extends SharedProps {
    isClickable: boolean;
    sizesByBreakpoint: Responsive<Size>;
}

export class Button extends React.Component<Props> {
    public static Color = Color;
    public static Size = Size;
    public static TextAlign = TextAlign;

    public static defaultProps = {
        block: false,
        color: Color.Secondary,
        disabled: false,
        fluid: false,
        isLoading: false,
        size: Size.Sm,
        textAlign: "center",
        type: "button"
    };

    public preventDefault = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    public handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (this.props.onClick && typeof this.props.onClick === "function") {
            this.props.onClick(e);
        }
    };

    public render() {
        const {
            block,
            children,
            color,
            disabled,
            div,
            fluid,
            id,
            input,
            isLoading,
            noBackground,
            noBorder,
            noWrap,
            onClick,
            size,
            textAlign,
            to,
            type,
            value,
            name
        } = this.props;

        const isDisabled = isLoading || disabled;
        const sizesByBreakpoint = convertLazy<Size>(size);
        const commonProps = {
            block,
            color,
            disabled: isDisabled,
            fluid,
            id,
            isClickable: !!(onClick || to || type === "submit"),
            name,
            noBackground,
            noBorder,
            noWrap,
            onClick: this.handleClick,
            sizesByBreakpoint,
            tabIndex: isDisabled ? -1 : 0,
            textAlign,
            type
        };

        const loadingContents = (
            <ThemeConsumer>
                {theme => (
                    <LoadingWrapper>
                        <LoadingSpinner
                            color={
                                noBackground
                                    ? theme.buttons.getBackgroundColor(
                                          color,
                                          theme.colors
                                      )
                                    : theme.buttons.getLoadingSpinnerColorName(
                                          color,
                                          theme.colors
                                      )
                            }
                        />
                    </LoadingWrapper>
                )}
            </ThemeConsumer>
        );

        const content = (
            <Box
                display={Box.Display.Flex}
                alignItems={Box.AlignItems.Center}
                justifyContent={Box.JustifyContent.Center}
                css={genButtonContentCSS(isLoading)}
            >
                {children}
            </Box>
        );
        // Render an <a>
        if (to) {
            return (
                <StyledAnchor {...commonProps} to={to}>
                    {isLoading ? loadingContents : null}
                    {content}
                </StyledAnchor>
            );
        }
        // Render an <input>
        if (input) {
            const inputProps = {
                onMouseDown: this.preventDefault,
                type,
                value
            };
            return <StyledInput {...commonProps} {...inputProps} />;
        }
        // Render a div
        if (div) {
            const inputProps = {
                onMouseDown: this.preventDefault,
                type,
                value
            };
            return (
                <StyledDiv {...commonProps} {...inputProps}>
                    {isLoading ? loadingContents : null}
                    {content}
                </StyledDiv>
            );
        }

        /**
         *  NOTE: preventDefault is being used on onMouseDown to prevent buttons
         *  focusing on a mouse click. This has not been tested with browsers
         *  other than Chrome (Mac) and may have unintended side effects.
         */
        return (
            <StyledButton {...commonProps} onMouseDown={this.preventDefault}>
                {isLoading ? loadingContents : null}
                {content}
            </StyledButton>
        );
    }
}

// The z-index of the content in the loading spinner is relative to the styled-button, so it
// goes above the button content when isLoading is true
const LoadingWrapper = styledFactory(styled.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: ${props => props.theme.zIndex.Z_INDEX_HIGHEST};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styledFactory(styled.div)`
    @keyframes loading {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    animation: loading .5s infinite linear;
    border: 0.1rem solid ${props => props.color};
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 1rem;
    left: 50%;
    margin-left: -.5rem;
    margin-top: -.5rem;
    position: absolute;
    top: 50%;
    width: 1rem;
    z-index: 1;
`;
const genButtonContentCSS = (isLoading: boolean) =>
    cssFactory(css)`
        visibility: ${isLoading ? "hidden" : "visible"};
    `;

const commonStyles = cssFactory<InternalProps>(css)`
    backface-visibility: hidden;
    background-color: ${props =>
        props.theme.buttons.getBackgroundColor(
            props.color,
            props.theme.colors,
            props.noBackground
        )};
    border-radius: ${props => props.theme.cornerRadii.default};
    border: ${props =>
        props.theme.buttons.getBorderStyle(
            props.color,
            props.theme.colors,
            props.noBorder
        )};
    box-sizing: border-box;
    color: ${props =>
        props.theme.buttons.getTextColor(
            props.color,
            props.theme.colors,
            props.noBackground
        )} !important;
    cursor: ${props => (props.isClickable ? "pointer" : "default")};
    display: ${props => (props.block ? "block" : "inline-block")};
    ${props =>
        responsiveStyle(
            "fontSize",
            props.sizesByBreakpoint,
            props.theme,
            (size: Size) => props.theme.text.getSize(size)
        )};
    font-weight: ${props => props.theme.buttons.fontWeight};
    opacity: ${props => (props.disabled ? "0.35" : "unset")};
    ${props =>
        responsiveStyle(
            "padding",
            props.sizesByBreakpoint,
            props.theme,
            (size: Size) =>
                props.theme.units.getValues(props.theme.buttons.padding[size])
        )};
    position: relative;
    pointer-events: ${props => (props.disabled ? "none" : "unset")};
    text-align: ${props => props.textAlign};
    text-decoration: none;
    transition: ${props => props.theme.transitions.default};
    user-select: none;
    white-space: ${props => (props.noWrap ? "nowrap" : "unset")};
    ${props =>
        responsiveConditionalStyle(
            "width",
            props.fluid,
            "100%",
            "unset",
            props.theme
        )};
    &:focus {
        ${props => props.theme.buttons.getFocusStyles()}
    }
    &:hover {
        ${props =>
            !props.disabled && props.isClickable
                ? props.theme.buttons.getHoverStyles(
                      props.color,
                      props.theme.colors,
                      props.noBackground
                  )
                : ""};
    }
    &:active {
        ${props =>
            !props.disabled
                ? props.theme.buttons.getActiveStyles(
                      props.color,
                      props.theme.colors,
                      props.noBackground
                  )
                : ""};
    }
`;

const StyledAnchor = styled(Link)`
    ${commonStyles};
`;
const StyledButton = styled.button`
    ${commonStyles};
`;
const StyledDiv = styled.div`
    ${commonStyles};
`;
const StyledInput = styled.input`
    ${commonStyles};
`;
