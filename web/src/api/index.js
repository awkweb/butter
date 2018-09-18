import axios from 'axios'

const getAppUrl = () =>
    `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? ':' : ''
    }${window.location.port}`

export default {
    signUp: async (email, password) => {
        const user = await
    },
}
