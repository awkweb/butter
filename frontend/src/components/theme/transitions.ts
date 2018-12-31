import EASING from "./easing";

const DEFAULT_TIME = 300; // ms
const SLOW_TIME = 500;

export default Object.freeze({
    default: `all ${DEFAULT_TIME}ms ${EASING.EXPO}`,
    slow: `all ${SLOW_TIME}ms ${EASING.EXPO}`,
    easing: {
        default: EASING.EXPO
    },
    timeEasing: {
        default: `${DEFAULT_TIME}ms ${EASING.EXPO}`
    }
});
