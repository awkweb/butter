import { format, isSameMonth } from 'date-fns'

export const getUserFromLocalStorage = () =>
    JSON.parse(localStorage.getItem('user')) || undefined

export const isLoggedIn = () => getUserFromLocalStorage() !== undefined

export const beforeEnterIsLoggedIn = (to, from, next) => {
    if (isLoggedIn()) next()
    else next({ name: 'LogIn' })
}

export const beforeEnterIsLoggedOut = (to, from, next) => {
    if (!isLoggedIn()) next()
    else next({ name: 'Home' })
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

export const formatDateRange = (dateOne, dateTwo) => {
    let formattedDates = ''
    if (dateOne) {
        formattedDates = format(dateOne, 'MMM D')
    } else {
        formattedDates = 'Start'
    }
    if (dateOne !== dateTwo) {
        if (dateTwo) {
            const dateFormat = isSameMonth(dateOne, dateTwo) ? 'D' : 'MMM D'
            formattedDates = `${formattedDates} - ${format(
                dateTwo,
                dateFormat,
            )}`
        } else {
            formattedDates = `${formattedDates} - End`
        }
    }
    return formattedDates
}

export const toAmount = value => (value / 100).toFixed(2)

export const toCents = value => value * 100
