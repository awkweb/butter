import Theme from '@/components/theme'

export const getBorderStyle = error => {
    return `1px solid ${error ? Theme.Color.Red3 : Theme.Color.Gray8}`
}
