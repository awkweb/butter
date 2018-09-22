const isLoggedIn = () => JSON.parse(localStorage.getItem('user')) !== null

export const beforeEnterIsLoggedIn = (to, from, next) => {
    if (isLoggedIn()) next()
    else next({ name: 'Home' })
}

export const beforeEnterIsLoggedOut = (to, from, next) => {
    if (!isLoggedIn()) next()
    else next({ name: 'Dashboard' })
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
