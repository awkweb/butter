// react-select overrides
import colors from "../colors";
import cornerRadii from "../corner-radii";
import text from "../text";
import zIndex from "../z-index";
import { Weight } from "../../types/text";

export default () => `
	.react-select__control {
		background-color: ${colors.red1};
		border-radius: ${cornerRadii.default} !important;
		box-sizing: border-box;
		font-family: ${text.getFont()};
		padding: 0;
		outline: 0;
	}

	.react-select__placeholder {
        color: ${colors.gray6} !important;
	}
	
	.react-select__control--is-focused {
        box-shadow: none !important;
	}
	
	.react-select__menu {
        background-color: ${colors.white};
        border-radius: ${cornerRadii.default} !important;
        box-sizing: border-box;
		margin: 0 !important;
		overflow: hidden;
        position: absolute;
        z-index: ${zIndex.Z_INDEX_2};
	}
	
	.react-select__menu-list {
        padding: 0 !important;
	}
	
	.react-select__option {
        cursor: pointer;

        &:active {
            background-color: ${colors.gray8};
        }

        &:first-child {
            border-top-right-radius: ${cornerRadii.default};
            border-top-left-radius: ${cornerRadii.default};
        }

        &:last-child {
            border-bottom-right-radius: ${cornerRadii.default};
            border-bottom-left-radius: ${cornerRadii.default};
        }
	}
	
	.react-select__option--is-focused {
        background-color: ${colors.gray10} !important;
        color: ${colors.gray1} !important;

        &:active {
            background-color: ${colors.gray9} !important;
        }
    }
    
    .react-select__option--is-selected {
        background-color: ${colors.blue3} !important;
        color: ${colors.white} !important;
		font-weight: ${text.getWeight(Weight.Bold)};

        &:active {
            background-color: ${colors.blue2} !important;
        }
    }
`;
