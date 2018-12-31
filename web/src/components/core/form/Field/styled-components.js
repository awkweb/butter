import styled from 'vue-styled-components'
import { getValues, style } from '@/components/utils/css'
import Theme from '@/components/theme'
import Tex from '@/components/core/typography/Tex/constants'
import Field from './constants'
import { getBorderStyle } from './utils'

export const StyledFieldset = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    paddding: 0;
    position: relative;
`

const styledLabelProps = {
    active: Boolean,
    error: Boolean,
}

const labelStyles = props => `
    ${style('color', props.error ? Theme.Color.Red3 : Theme.Color.Gray1)};
    ${style('backgroundColor', Theme.Color.White)};
    ${style('fontFamily', Theme.Font.Lato)};
    ${style('fontSize', Tex.Size.Xs)};
    ${style('opacity', props.active ? 1 : 0)};
    padding: 0 0.45rem;
    ${style('pointerEvents', props.active ? 'all' : 'none')};
    position: absolute;
    left: 0.6rem;
    ${style('top', props.active ? '-0.5rem' : 0)};
    transition: color, opacity, top 125ms;
`

export const StyledLabel = styled('label', styledLabelProps)`
    ${labelStyles}
`

const sharedFieldStyles = props => `
    ${style('border', getBorderStyle(props.error))};
    ${style('borderRadius', Theme.CornerRadius.Small)};
    ${style('color', Theme.Color.Gray1)};
    ${style('fontFamily', Theme.Font.Lato)};
    ${style('fontSize', Tex.Size.Md)};
    outline: 0;
    transition: border-color 125ms;
    width: 100%;

    &::-webkit-input-placeholder {
        ${style('color', Theme.Color.Gray5)};
    }

    &:focus {
        ${style(
            'borderColor',
            props.error ? Theme.Color.Red3 : Theme.Color[props.color],
        )};
    }
`

const styledInputProps = {
    color: String,
    error: Boolean,
}

const inputStyles = props => `
    ${sharedFieldStyles(props)}
    height: 2.8rem;
    ${style('padding', getValues(Field.Padding.Normal))};
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const StyledInput = styled('input', styledInputProps)`
    ${inputStyles}
`

const styledTextAreaProps = {
    color: String,
    error: Boolean,
}

const textAreaStyles = props => `
    ${sharedFieldStyles(props)}
    padding: 0.75rem 0.5rem 0.15rem;
    resize: none;

    &[rows] {
        height: auto;
    }
`

export const StyledTextArea = styled('textarea', styledTextAreaProps)`
    ${textAreaStyles}
`
