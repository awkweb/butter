import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.wilbur.app/v1/'
        : 'https://api.wilbur.local/v1/'

export default axios.create({
    baseURL,
})
