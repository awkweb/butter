import styled from 'vue-styled-components'
import Theme from '@/components/theme'

export const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
`

export const StyledTableHeader = styled.thead`
    background-color: ${Theme.Color.Gray10};

    th {
        border-bottom: 1px solid ${Theme.Color.Gray8};
        padding: 0.7rem 1rem;
        word-break: normal;
    }
`
