const isLoggedIn = () => JSON.parse(localStorage.getItem('user')) !== null

export const beforeEnterIsLoggedIn = (to, from, next) => {
    if (isLoggedIn()) next()
    else next({ name: 'Home' })
}

export const beforeEnterIsLoggedOut = (to, from, next) => {
    if (!isLoggedIn()) next()
    else next({ name: 'Dashboard' })
}
