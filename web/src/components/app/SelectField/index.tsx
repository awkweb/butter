import * as React from "react";
import { StyledFieldset, StyledLabel } from "../../core/components/form/Field";
import { Box } from "../../index";
import { cssFactory } from "../../core/utils/styled-components";
import { css } from "styled-components";
import field from "../../core/theme/field";
import { AnyColor as Color } from "../../core/types/color";
import { Weight, Size } from "../../core/types/text";
import Select from "react-select";
import { GroupType, ValueType, ActionMeta } from "react-select/lib/types";

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
                        isSearchable
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
		background-color: ${props => props.theme.colors.white} !important;
		border: ${props =>
            field.getBorderStyle(
                Color.Gray8,
                props.theme.colors,
                error
            )} !important;
		border-radius: ${props => props.theme.cornerRadii.default} !important;
		box-sizing: border-box;
		color: ${props => props.theme.colors.gray1} !important;
		font-family: ${props => props.theme.text.getFont()};
		font-weight: ${props => props.theme.text.getWeight(Weight.Normal)} !important;
		font-size: ${props => props.theme.text.getSize(Size.Md)};
		height: 2.8125rem;
		padding: 0;
		outline: 0;
		transition: border-color 125ms;
		width: 100%;

		&::-webkit-input-placeholder {
        	color: ${props => props.theme.colors.gray6};
		}

		&:focus {
			border: ${props =>
                field.getFocusStyles(
                    Color.Gold3,
                    props.theme.colors,
                    error
                )} !important;
		}
    }
    
    .react-select__value-container {
		padding: ${props =>
            props.theme.units.getValues(field.padding.input)} !important;
    }

	.SingleDatePicker_picker {
		top: 54px !important;
	}
`;
