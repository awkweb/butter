export const toAmount = (value: number): number => value / 100;

export const toCents = (value: number): number => value * 100;

export function prettyNumber(value: number, showCurrency: boolean = false) {
    const amount = toAmount(value)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (showCurrency) {
        return value < 0 ? amount.replace("-", "-$") : `$${amount}`;
    }
    return amount;
}
