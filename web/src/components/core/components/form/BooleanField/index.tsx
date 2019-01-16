import * as React from "react";
import styled, { css } from "styled-components";
import { style } from "../../../utils/css";
import { cssFactory } from "../../../utils/styled-components";
import { AnyColor as Color } from "../../../types/color";
import { getBorderStyle } from "./utils";
import { Check, Deselect, Icon } from "../../icons/Icon";

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
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

/**
 * Use `<BooleanField>` if you need a boolean input.
 */
export class BooleanField extends React.Component<Props> {
    public static Color = Color;

    public static defaultProps = { color: Color.Blue3, disabled: false };

    public render() {
        const { color, checked, deselect, id, onChange } = this.props;

        let icon;
        if (deselect) {
            icon = <Deselect color={Icon.Color.White} size={Icon.Size.Xxxs} />;
        } else {
            icon = <Check color={Icon.Color.White} size={Icon.Size.Xxxs} />;
        }

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
    align-items: center;
    ${props =>
        style("background", props.theme.colors[props.color], props.checked)};
    border-radius: 3px;
    border: ${props =>
        getBorderStyle(Color.Gray8, props.theme.colors, props.checked)};
    color: ${props => props.theme.colors.white};
    cursor: pointer;
    display: inline-flex;
    height: 20px;
    justify-content: center;
    width: 20px;
`;

const StyledContainer = styled.label`
    ${checkboxStyles}
`;

const StyledInput = styled.input`
    display: none;
`;
