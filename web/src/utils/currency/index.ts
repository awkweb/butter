export const toAmount = (value: number): number => value / 100;

export const toCents = (value: number): number => value * 100;

export function prettyNumber(value: number) {
    return toAmount(value)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
