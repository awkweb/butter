export const getUserFromLocalStorage = () =>
    JSON.parse(localStorage.getItem('user'))

export const isLoggedIn = () => getUserFromLocalStorage() !== null

export const beforeEnterIsLoggedIn = (to, from, next) => {
    if (isLoggedIn()) next()
    else next({ name: 'Home' })
}

export const beforeEnterIsLoggedOut = (to, from, next) => {
    if (!isLoggedIn()) next()
    else next({ name: 'Budgets' })
}

export function get(getterFn, defaultValue) {
    try {
        const value = getterFn()
        return value === undefined ? defaultValue : value
    } catch (error) {
        if (error instanceof TypeError) {
            return defaultValue
        }
        throw error
    }
}
