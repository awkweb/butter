import * as React from "react";
import { StyledFieldset, StyledLabel } from "../../form/Field";
import { cssFactory } from "../../../utils/styled-components";
import { css } from "styled-components";
import field from "../../../theme/field";
import { AnyColor as Color } from "../../../types/color";
import { Weight, Size } from "../../../types/text";
import Select from "react-select";
import { GroupType, ValueType, ActionMeta } from "react-select/lib/types";
import { Box } from "../../layout/Box";

interface Props {
    error?: string;
    id: string;
    options?: GroupType<any>[] | any[] | undefined;
    placeholder: string;
    value: any;
    onChange: ((
        value: ValueType<{
            value: string;
            label: string;
        }>,
        action: ActionMeta
    ) => void);
}

export class SelectField extends React.Component<Props> {
    state = { isTouched: false };

    private onBlur = () => {
        const { isTouched } = this.state;
        if (!isTouched) {
            this.setState({
                isTouched: true
            });
        }
    };

    render() {
        const { error, id, options, placeholder, value, onChange } = this.props;
        const { isTouched } = this.state;
        const hasError = isTouched && !!error;
        return (
            <Box css={genInputCSS(hasError)}>
                <StyledFieldset>
                    <StyledLabel
                        {...{
                            active: !!value || hasError,
                            error: hasError,
                            htmlFor: id
                        }}
                    >
                        {hasError ? error : placeholder}
                    </StyledLabel>
                    <Select
                        classNamePrefix="react-select"
                        menuPlacement="auto"
                        name={id}
                        placeholder={hasError ? "" : placeholder}
                        options={options}
                        value={value}
                        onBlur={this.onBlur}
                        onChange={onChange}
                    />
                </StyledFieldset>
            </Box>
        );
    }
}

const genInputCSS = (error: boolean) =>
    cssFactory(css)`
	.react-select__control {
		background-color: ${props => props.theme.colors.white};
		border: ${props =>
            field.getBorderStyle(Color.Gray8, props.theme.colors, error)};
		border-radius: ${props => props.theme.cornerRadii.default};
		box-sizing: border-box;
		color: ${props => props.theme.colors.gray1};
		font-family: ${props => props.theme.text.getFont()};
		font-weight: ${props => props.theme.text.getWeight(Weight.Normal)};
		font-size: ${props => props.theme.text.getSize(Size.Md)};
		height: 2.8125rem;
		padding: 0;
		outline: 0;
		transition: border-color 125ms;
        width: 100%;
        
        &:hover {
            border: ${props =>
                field.getBorderStyle(Color.Gray8, props.theme.colors, error)};
        }
    }

    .react-select__placeholder {
        color: ${props => props.theme.colors.gray6};
    }

    .react-select__control--is-focused {
        border: ${props =>
            field.getFocusStyles(Color.Gold3, props.theme.colors, error)};
        box-shadow: none;
    }
    
    .react-select__value-container {
		padding: ${props => props.theme.units.getValues(field.padding.input)};
    }

    .react-select__indicator-separator {
        border-color: ${props => props.theme.colors.gray8};
    }

	.react-select__menu {
        background-color: ${props => props.theme.colors.white};
        border-radius: ${props => props.theme.cornerRadii.default};
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 54px;
        width: 100%;
        z-index: ${props => props.theme.zIndex.Z_INDEX_2};
    }

    .react-select__menu-list {
        padding: 0;
    }

    .react-select__option {
        cursor: pointer;
        padding: 0.65rem 1rem;

        &:active {
            background-color: ${props => props.theme.colors.gray8};
        }

        &:first-child {
            border-top-right-radius: ${props =>
                props.theme.cornerRadii.default};
            border-top-left-radius: ${props => props.theme.cornerRadii.default};
        }

        &:last-child {
            border-bottom-right-radius: ${props =>
                props.theme.cornerRadii.default};
            border-bottom-left-radius: ${props =>
                props.theme.cornerRadii.default};
        }
    }

    .react-select__option--is-focused {
        background-color: ${props => props.theme.colors.gray10};
        color: ${props => props.theme.colors.gray1};

        &:active {
            background-color: ${props => props.theme.colors.gray9};
        }
    }
    
    .react-select__option--is-selected {
        background-color: ${props => props.theme.colors.blue3};
        color: ${props => props.theme.colors.white};

        &:active {
            background-color: ${props => props.theme.colors.blue2};
        }
    }
`;
