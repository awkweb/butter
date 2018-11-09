export const getUserFromLocalStorage = () =>
    JSON.parse(localStorage.getItem('user'))

export const isLoggedIn = () => getUserFromLocalStorage() !== null

export const beforeEnterIsLoggedIn = (to, from, next) => {
    if (isLoggedIn()) next()
    else next({ name: 'Home' })
}

export const beforeEnterIsLoggedOut = (to, from, next) => {
    if (!isLoggedIn()) next()
    else next({ name: 'Inbox' })
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

export const getOrderForBudgetId = (
    budgetId,
    movedBudgetId,
    isDemotion,
    lowerIndex,
    upperIndex,
    currentIndex,
) => {
    if (budgetId === movedBudgetId) {
        return isDemotion ? upperIndex : lowerIndex
    } else {
        const currentOrder = lowerIndex + currentIndex
        return isDemotion ? currentOrder - 1 : currentOrder + 1
    }
}

export const disableBodyScroll = () => (document.body.style.overflow = 'hidden')

export const enableBodyScroll = () => (document.body.style.overflow = 'inherit')
