import * as React from "react";
import { SingleDatePicker } from "react-dates";
import { Moment } from "moment";
import { StyledFieldset, StyledLabel } from "../../form/Field";
import { cssFactory } from "../../../utils/styled-components";
import { css } from "styled-components";
import field from "../../../theme/field";
import { AnyColor as Color } from "../../../types/color";
import { Weight, Size } from "../../../types/text";
import { Box } from "../../layout/Box";

interface Props {
    error?: string;
    focused: boolean;
    value: Moment | null;
    onChange: ((date: Moment | null) => void);
    onFocusChange: ((arg: { focused: boolean | null }) => void);
}

export class DateField extends React.Component<Props> {
    state = { isTouched: false, isTouchedFlag: false };

    public handleFocusChange = (arg: { focused: boolean | null }) => {
        this.props.onFocusChange(arg);
        const { isTouched, isTouchedFlag } = this.state;
        if (isTouchedFlag && !isTouched) this.setState({ isTouched: true });
        if (!isTouchedFlag) {
            this.setState({ isTouchedFlag: true });
        }
    };

    render() {
        const { error, focused, value, onChange } = this.props;
        const { isTouched } = this.state;
        const hasError = isTouched && !!error;
        return (
            <Box css={genInputCSS(hasError)}>
                <StyledFieldset>
                    <StyledLabel
                        {...{
                            active: !!value || hasError,
                            error: hasError,
                            htmlFor: "date"
                        }}
                    >
                        {hasError ? error : "Date"}
                    </StyledLabel>
                    <SingleDatePicker
                        block
                        date={value}
                        focused={focused}
                        hideKeyboardShortcutsPanel
                        id="date"
                        isOutsideRange={() => false}
                        noBorder
                        numberOfMonths={1}
                        placeholder={hasError ? "" : "Date"}
                        transitionDuration={0}
                        onDateChange={onChange}
                        onFocusChange={this.handleFocusChange}
                    />
                </StyledFieldset>
            </Box>
        );
    }
}

const genInputCSS = (error: boolean) =>
    cssFactory(css)`
    .DateInput {
		background: transparent !important;
	}

	.DateInput_input {
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
		padding: ${props =>
            props.theme.units.getValues(field.padding.input)} !important;
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

	.SingleDatePicker_picker {
        top: 54px !important;
        z-index: ${props => props.theme.zIndex.Z_INDEX_2};
	}
`;
