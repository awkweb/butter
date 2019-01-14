import * as React from "react";
import styled, { css } from "styled-components";
import { style } from "../../../utils/css";
import { cssFactory } from "../../../utils/styled-components";
import { AnyColor as Color } from "../../../types/color";

interface Props {
    /**
     * Defaults to `Field.Color.Gold3`.
     */
    color: Color;

    /**
     * Input is set to true
     */
    checked: boolean;

    /**
     * Applies disabled styling to the button.
     */
    disabled: boolean;

    /**
     * HTML id property.
     */
    id?: string;

    /**
     * Sets the label.
     */
    label?: React.ReactNode;

    /**
     * Callback function for checkbox change.
     */
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);

    /**
     * Sets the value.
     */
    value: any;
}

/**
 * Use `<Checkbox>` if you need a boolean input.
 */
export class Checkbox extends React.Component<Props> {
    public static Color = Color;

    public static defaultProps = { color: Color.Gold3 };

    public render() {
        const { color, checked, id, label, onChange } = this.props;

        return (
            <StyledCheckbox color={color}>
                <input
                    checked={checked}
                    id={id}
                    name={id}
                    type="checkbox"
                    onChange={onChange}
                />
                {label && label}
            </StyledCheckbox>
        );
    }
}

interface CheckboxProps {
    color: Color;
}

const checkboxStyles = cssFactory<CheckboxProps>(css)`
    ${props => style("background", props.theme.colors[props.color])};
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dadfe2;
    border-radius: 3px;
    color: #fff;
    flex: none;
`;

const StyledCheckbox = styled.label`
    ${checkboxStyles}
`;
