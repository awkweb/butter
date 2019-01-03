import colors from "../colors";
import text, { typeScaleRoot } from "../text";
import { Size } from "../../types/space";

const PAGE_MIN_WIDTH = "320px";

const unimportantTextSize = (size: Size) =>
    (text.getSize(size) as string).replace(" !important", "");

export default () => `
        html {
            box-sizing: border-box;
            font-size: ${typeScaleRoot};
        }
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: ${colors.white};
            color: ${colors.gray1};
            font-family: ${text.getFont()};
            min-width: ${PAGE_MIN_WIDTH};
            text-rendering: optimizeLegibility;
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
            a {
                cursor: pointer;
            }
            p, ol {
                font-size: ${unimportantTextSize(Size.Xs)};
                line-height: ${text.getLineHeight(1)};
            }
        }
    `;
