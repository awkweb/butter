export function reduce(obj, reducer, initialValue) {
    if (!obj) {
        return undefined
    }
    const keys = Object.keys(obj)

    return keys.reduce(
        (accumulator, key) => reducer(accumulator, key),
        initialValue,
    )
}
