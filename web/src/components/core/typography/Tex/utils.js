export function getMargin(el) {
    switch (el) {
        case 'P':
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
            return '1rem 0 !important'
        default:
            return '0'
    }
}
