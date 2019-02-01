// react-dates overrides https://github.com/airbnb/react-dates#overriding-styles
import colors from "../colors";
import cornerRadii from "../corner-radii";
import text from "../text";
import { Weight } from "../../types/text";

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
		box-shadow: 0 0 0 1px hsla(0,0%,0%,0.1), 0 4px 11px hsla(0,0%,0%,0.1);
	}

	// Will edit when the second date (end date) in a range of dates
	// is not yet selected. Edits the dates between your mouse and said date
	.CalendarDay__hovered_span:hover,
	.CalendarDay__hovered_span {
		background: ${colors.blue5} !important;
		border-color: ${colors.blue5} !important;
		color: ${colors.blue1} !important;
	}

	.CalendarDay__selected_span:hover,
	.CalendarDay__selected_span {
		color: ${colors.white} !important;
	}

	.CalendarDay__selected_span {
		background: ${colors.blue4} !important;
		border-color: ${colors.blue4} !important;
	}

	.CalendarDay__selected_span:hover {
		background: ${colors.blue3} !important;
		border-color: ${colors.blue3} !important;
	}

	// Will edit selected date or the endpoints of a range of dates
	.CalendarDay__selected,
	.CalendarDay__selected:hover {
		background: ${colors.blue2} !important;
		border-color: ${colors.blue2} !important;
		color: ${colors.white} !important;
		font-weight: ${text.getWeight(Weight.Bold)};
	}
`;
