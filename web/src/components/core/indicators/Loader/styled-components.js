import styled from 'vue-styled-components'
import { style } from '@/components/utils/css'
import Loader from './constants'

const props = {
    color: String,
}

const styles = props => `
    @keyframes loader {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0.1;
            transform: translateY(-1rem);
        }
    }
    animation: loader .6s infinite alternate;
    ${style('background', Loader.Color[props.color])};
    border-radius: 50%;
    height: 1rem;
    margin: 0 0.2rem;
    width: 1rem;

    &:nth-child(2) {
        animation-delay: 0.2s;
    }

    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`

export const StyledLoader = styled('div', props)`
    ${styles};
`
