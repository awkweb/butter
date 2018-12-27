export function columnValidator(value) {
    return value >= 0 && value <= 12
}

export function responsiveValidator(value, values) {
    switch (typeof value) {
        case 'string':
            return value in values
        case 'object':
            // TODO: Check that object matches responsive structure
            // { xs: 'Md', lg: 'Lg' }
            return true
        default:
            return false
    }
}

export function responsiveBooleanValidator(value) {
    switch (typeof value) {
        case 'boolean':
            return true
        case 'object':
            // TODO: Check that object matches responsive structure
            // { xs: 'Md', lg: 'Lg' }
            return true
        default:
            return false
    }
}

export function responsiveNumberValidator(value) {
    switch (typeof value) {
        case 'number':
            return true
        case 'object':
            // TODO: Check that object matches responsive structure
            // { xs: 'Md', lg: 'Lg' }
            return true
        default:
            return false
    }
}
