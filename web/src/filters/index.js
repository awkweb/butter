import { formatDistance } from 'date-fns'

export function prettyNumber(number) {
    return number
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function hoursAgo(date) {
    return `${formatDistance(date, new Date())} ago`
}
