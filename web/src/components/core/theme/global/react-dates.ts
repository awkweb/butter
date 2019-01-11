// react-dates overrides https://github.com/airbnb/react-dates#overriding-styles
import colors from "../colors";
import cornerRadii from "../corner-radii";

export default () => `
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
