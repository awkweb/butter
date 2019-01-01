import colors from "../colors";
import text, { typeScaleRoot } from "../text";
import { Size } from "../../types/space";

const PAGE_MIN_WIDTH = "320px";

const unimportantTextSize = (size: Size) =>
    (text.getSize(size) as string).replace(" !important", "");

export default () => `
        html {
            box-sizing: border-box;
        }
        body {
            min-width: ${PAGE_MIN_WIDTH};
            /**
            * Should match footer background color so short pages
            * don't result in a "floating" footer bar.
            */
            background-color: ${colors.white};
        }
        .reactWrapper {
            ul {
                margin: 0;
            }
            p {
                margin: 0;
            }
            /*
            BASE STYLES / BASE TYPOGRAPHY STYLES
            */
            color: ${colors.gray1};
            font-family: ${text.getFont()};
            font-size: ${typeScaleRoot};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            a {
                text-decoration: none;
                cursor: pointer;
            }
            p, ol {
                font-size: ${unimportantTextSize(Size.Xs)};
                line-height: ${text.getLineHeight(1)};
            }
        }
    `;
