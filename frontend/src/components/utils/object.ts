export type Reducer<T extends object, Accumulator> = (
    accumulator: Accumulator,
    key: keyof T
) => Accumulator;

export function reduce<T extends object, Accumulator>(
    object: T | undefined,
    reducer: Reducer<T, Accumulator>,
    initialValue: Accumulator
): Accumulator | undefined;
export function reduce<T extends object, Accumulator>(
    object: T,
    reducer: Reducer<T, Accumulator>,
    initialValue: Accumulator
): Accumulator;
export function reduce<T extends object, Accumulator>(
    obj: T | undefined | null,
    reducer: Reducer<T, Accumulator>,
    initialValue: Accumulator
): Accumulator | undefined | null {
    if (!obj) {
        return undefined;
    }
    const keys = Object.keys(obj) as Array<keyof T>;

    return keys.reduce(
        (accumulator: Accumulator, key: keyof T) => reducer(accumulator, key),
        initialValue
    );
}
