export function get(getterFn: Function, defaultValue?: any) {
    try {
        const value = getterFn();
        return value === undefined ? defaultValue : value;
    } catch (error) {
        if (error instanceof TypeError) {
            return defaultValue;
        }
        throw error;
    }
}
