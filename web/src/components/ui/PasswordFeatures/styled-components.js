import styled from 'vue-styled-components'
import Theme from '@/components/theme'

const props = {
    success: Boolean,
}

const styles = props => `
    align-items: center;
    display: flex;
    margin-bottom: 0.25rem;
    ${props.success && `opacity: 0.35;`}
    transition: opacity 125ms;

    &:before {
        background-color: ${Theme.Color.Green3};
        border-radius: 8px;
        content: '';
        display: inline-block;
        height: 8px;
        margin-right: 0.5rem;
        min-height: 8px;
        min-width: 8px;
        width: 8px;
    }
`

export const StyledPasswordFeature = styled('div', props)`
    ${styles};
`
