import * as React from "react";
import styled, { css } from "styled-components";

import { AnyColor as Color } from "../../../types/color";
import { style } from "../../../utils/css";
import { cssFactory } from "../../../utils/styled-components";
import { Check, Deselect, Icon } from "../../icons/Icon";

import { getBorderStyle } from "./utils";
// import { Box } from "../../layout/Box";

interface Props {
    /**
     * Sets checked color.
     */
    color: Color;

    /**
     * Input is set to true
     */
    checked: boolean;

    /**
     * Show deselect icon.
     */
    deselect?: boolean;

    /**
     * Applies disabled styling to the button.
     */
    disabled: boolean;

    /**
     * HTML id property.
     */
    id?: string;

    /**
     * Callback function for checkbox change.
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Use `<BooleanField>` if you need a boolean input.
 */
export class BooleanField extends React.Component<Props> {
    public static Color = Color;

    public static defaultProps = { color: Color.Blue3, disabled: false };

    public render() {
        const { color, checked, deselect, id, onChange } = this.props;

        const icon = deselect ? (
            <Deselect color={Icon.Color.White} size={Icon.Size.Xxxs} />
        ) : (
            <Check color={Icon.Color.White} size={Icon.Size.Xxxs} />
        );

        return (
            <StyledContainer checked={checked} color={color} role="checkbox">
                <StyledInput
                    checked={checked}
                    id={id}
                    name={id}
                    type="checkbox"
                    onChange={onChange}
                />
                {checked && icon}
            </StyledContainer>
        );
    }
}

interface BooleanFieldProps {
    checked: boolean;
    color: Color;
}

const checkboxStyles = cssFactory<BooleanFieldProps>(css)`
    ${props =>
        style(
            "background",
            props.checked
                ? props.theme.colors[props.color]
                : props.theme.colors.white
        )};
    border-radius: 3px;
    border: ${props =>
        getBorderStyle(Color.Gray8, props.theme.colors, props.checked)};
    color: ${props => props.theme.colors.white};
    cursor: pointer;
    display: block;
    height: 20px;
    position: relative;
    width: 20px;

    &> div {
        align-items: center;
        bottom: 0;
        justify-content: center;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

    svg {
        height: 10px;
        width: 10px;
    }
`;

const StyledContainer = styled.label`
    ${checkboxStyles}
`;

const StyledInput = styled.input`
    display: none;
    width: 10px;
    height: 10px;
`;
