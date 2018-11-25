import { formatDistance } from 'date-fns'
import { toAmount } from '@/utils'

export function prettyNumber(number) {
    return toAmount(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function hoursAgo(date) {
    return `${formatDistance(date, new Date())} ago`
}
