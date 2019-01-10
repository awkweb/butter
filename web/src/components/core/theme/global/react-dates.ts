// react-dates overrides https://github.com/airbnb/react-dates#overriding-styles
import colors from "../colors";
import text from "../text";
import cornerRadii from "../corner-radii";
import { Size, Weight } from "../../types/text";
import field from "../field";
import { AnyColor as Color } from "../../types/color";
import units from "../units";

export default () => `
	.DateInput {
		background: transparent !important;
	}

	.DateInput_input {
		background-color: ${colors.white} !important;
		border: ${field.getBorderStyle(Color.Gray8, colors, false)} !important;
		border-radius: ${cornerRadii.default} !important;
		box-sizing: border-box;
		color: ${colors.gray1} !important;
		font-family: ${text.getFont()};
		font-weight: ${text.getWeight(Weight.Normal)} !important;
		font-size: ${text.getSize(Size.Md)};
		height: 2.8125rem;
		padding: ${units.getValues(field.padding.input)} !important;
		outline: 0;
		transition: border-color 125ms;
		width: 100%;

		&::-webkit-input-placeholder {
        	color: ${colors.gray6};
		}
		
		&:focus {
			border: ${field.getFocusStyles(Color.Gold3, colors, false)} !important;
		}
	}

	.SingleDatePicker_picker {
		top: 54px !important;
	}

	.DateInput_fang {
		display: none !important;
	}

	.CalendarMonth_caption {
		color: ${colors.gray1} !important;
	}

	.CalendarDay__default {
		color: ${colors.gray2} !important;
		border-color: ${colors.gray9} !important;
	}

	.CalendarDay__default:hover {
		background: ${colors.gray9} !important;
	}

	.CalendarDay__blocked_out_of_range {
		color: ${colors.gray6} !important;
	}

	.CalendarDay__blocked_out_of_range:hover {
		background: ${colors.white} !important;
	}

	.DayPicker_weekHeader {
		color: ${colors.gray3} !important;
	}

	.DayPickerNavigation_button__default {
		color: ${colors.gray3} !important;
	}

	.DayPickerNavigation_button__horizontalDefault {
		border-radius: ${cornerRadii.default} !important;
	}

	.DayPicker__withBorder {
		border-radius: ${cornerRadii.default} !important;
	}

	// Will edit selected date or the endpoints of a range of dates
	.CalendarDay__selected,
	.CalendarDay__selected:hover {
		background: ${colors.gold3} !important;
		border-color: ${colors.gold3} !important;
		color: ${colors.white} !important;
	}

	// Will edit when the second date (end date) in a range of dates
	// is not yet selected. Edits the dates between your mouse and said date
	.CalendarDay__hovered_span:hover,
	.CalendarDay__hovered_span {
	}
`;
