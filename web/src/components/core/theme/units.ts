const BASE_UNIT = 0.5; // rem
const UNIT_MIN = -128;
const UNIT_MAX = 128;

const getRange = () => ({
    min: UNIT_MIN,
    max: UNIT_MAX
});

const getValueAsNumber = (value: number) => BASE_UNIT * value;

const getValue = (value: number) => `${getValueAsNumber(value)}rem`;

// Takes either a number or an array of numbers
const getValues = (value: number | number[]): any => {
    if (typeof value === "number") {
        return getValue(value);
    }

    if (Array.isArray(value)) {
        return value.map(v => getValue(v)).join(" ");
    }
};

export default Object.freeze({
    getValueAsNumber,
    getValue,
    getValues,
    getRange
});
