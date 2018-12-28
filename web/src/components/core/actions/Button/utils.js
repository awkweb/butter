import Button from './constants'

export const getActiveStyles = colorName => `
    background-color: ${Button.ActiveColor[colorName]};
    border-color: ${Button.ActiveColor[colorName]};
`

export const getBorderStyle = colorName => {
    return `1px solid ${Button.Color[colorName]}`
}

export const getFocusStyles = () => `
    outline: none;
`

export const getHoverStyles = colorName => `
    background-color: ${Button.HoverColor[colorName]};
    border-color: ${Button.HoverColor[colorName]};
`

export const getTextColor = colorName => {
    return Button.TextColor[colorName]
}

export const getTextSize = size => {
    return Button.TextColor[colorName]
}
