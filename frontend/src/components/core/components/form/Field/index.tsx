import * as React from "react";
import styled, { css } from "styled-components";
import { style } from "../../../utils/css";
import { Box } from "../../layout/Box";
import { cssFactory } from "../../../utils/styled-components";
import { Size } from "../../../types/text";
import { AnyColor as Color } from "../../../types/color";
import { Type } from "../../../types/field";
import { ReactComponent as IconSuccess } from "../../../../../assets/icons/input-success.svg";
import { ThemeConsumer } from "../../theme/ThemeConsumer";

interface Props {
    /**
     * Applies disabled styling to the button.
     */
    autofocus?: boolean;

    /**
     * Defaults to `Field.Color.Gold3`.
     */
    color: Color;

    /**
     * Sets error message.
     */
    error?: string;

    /**
     * Applies disabled styling to the button.
     */
    disabled: boolean;

    /**
     * HTML id property.
     */
    id?: string;

    /**
     * Sets if the field is valid.
     */
    isValid?: boolean;

    /**
     * Sets the label and placeholder.
     */
    label: string;

    /**
     * Callback function for field change.
     */
    onChange: ((e: React.ChangeEvent<any>) => void);

    /**
     * If valid, show success icon.
     */
    showSuccess?: boolean;

    /**
     * HTML `type` attribute. See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
     */
    type: Type;

    /**
     * Sets the value.
     */
    value: string | number | undefined;
}

export class Field extends React.Component<Props> {
    public static Color = Color;
    public static Type = Type;

    public static defaultProps = {
        autofocus: false,
        color: Color.Gold3,
        disabled: false,
        type: Type.Text
    };

    public handleChange = (e: React.ChangeEvent<any>) => {
        if (this.props.onChange && typeof this.props.onChange === "function") {
            this.props.onChange(e);
        }
    };

    public render() {
        const {
            autofocus,
            color,
            error,
            disabled,
            id,
            isValid,
            label,
            showSuccess,
            type,
            value
        } = this.props;

        const active = !!value || !!error;
        const inputProps = {
            active,
            color,
            disabled,
            error,
            id,
            type,
            value,
            autoFocus: autofocus,
            onChange: this.handleChange,
            placeholder: label,
            spellCheck: false
        };

        if (type === Type.Textarea) {
            const textareaProps = { ...inputProps, rows: 5 };
            return (
                <StyledFieldset>
                    <StyledTextarea {...textareaProps} />
                </StyledFieldset>
            );
        }

        const labelProps = { active, error, htmlFor: id };

        return (
            <StyledFieldset>
                <StyledLabel {...labelProps}>{error || label}</StyledLabel>
                <StyledInput {...inputProps} />
                {showSuccess && isValid && (
                    <ThemeConsumer>
                        {theme => (
                            <Box
                                css={`
                                    right: 0.6rem;
                                    top: 0.8rem;
                                    fill: ${theme.colors.green3};
                                `}
                                position={Box.Position.Absolute}
                            >
                                <IconSuccess />
                            </Box>
                        )}
                    </ThemeConsumer>
                )}
            </StyledFieldset>
        );
    }
}

export const StyledFieldset = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    paddding: 0;
    position: relative;
`;

interface LabelProps {
    active?: boolean;
    error?: boolean | string;
    htmlFor?: string;
}

const labelStyles = cssFactory<LabelProps>(css)`
    ${props => style("color", props.error ? Color.Red3 : Color.Gray1)};
    ${style("backgroundColor", Color.White)};
    ${props => style("fontFamily", props.theme.text.getFont())};
    ${props => style("fontSize", props.theme.text.getSize(Size.Xs))};
    ${props => style("opacity", props.active ? 1 : 0)};
    padding: 0 0.45rem;
    ${props => style("pointerEvents", props.active ? "all" : "none")};
    position: absolute;
    left: 0.6rem;
    ${props => style("top", props.active ? "-0.5rem" : 0)};
    transition: color, opacity, top 125ms;
`;

const StyledLabel = styled.label`
    ${labelStyles}
`;

interface InputProps {
    color: Color;
    error?: boolean | string;
}

const sharedFieldStyles = cssFactory<InputProps>(css)`
    ${props =>
        style(
            "border",
            props.theme.field.getBorderStyle(
                Color.Gray8,
                props.theme.colors,
                !!props.error
            )
        )};
    ${props => style("borderRadius", props.theme.cornerRadii.default)};
    box-sizing: border-box;
    ${props => style("color", props.theme.colors[Color.Gray1])};
    ${props => style("fontFamily", props.theme.text.getFont())};
    ${props => style("fontSize", props.theme.text.getSize(Size.Md))};
    outline: 0;
    transition: border-color 125ms;
    width: 100%;
    &::-webkit-input-placeholder {
        ${props => style("color", props.theme.colors[Color.Gray6])};
    }
    &:focus {
        ${props =>
            style(
                "border",
                props.theme.field.getFocusStyles(
                    props.color,
                    props.theme.colors,
                    !!props.error
                )
            )};
    }
`;

const inputStyles = cssFactory<InputProps>(css)`
    ${sharedFieldStyles}
    height: 2.8125rem;
    ${props =>
        style(
            "padding",
            props.theme.units.getValues(props.theme.field.padding)
        )};
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const StyledInput = styled.input`
    ${inputStyles}
`;

const textareaStyles = cssFactory<InputProps>(css)`
    ${sharedFieldStyles}
    ${props =>
        style("padding", props.theme.units.getValues([0.55, 0.5, 0.15, 0.5]))};
    resize: none;

    &[rows] {
        height: auto;
    }
`;

export const StyledTextarea = styled.textarea`
    ${textareaStyles}
`;
