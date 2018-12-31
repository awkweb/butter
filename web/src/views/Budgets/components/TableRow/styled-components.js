import styled from 'vue-styled-components'
import Theme from '@/components/theme'

export const StyledTableRow = styled.tr`
    &.sortable-ghost {
        div {
            opacity: 0.5;
        }
    }

    &.sortable-drag {
        td {
            border: 0 !important;
        }
    }

    td {
        border-bottom: 1px solid ${Theme.Color.Gray8};
        padding-bottom: 1rem;
        padding-top: 1rem;

        &:first-child {
            border-right: 1px solid ${Theme.Color.Gray9};
        }
    }
`

export const StyledTableRowName = styled.td`
    padding-right: 1rem;

    span {
        margin-top: 0.25rem;
    }
`

export const StyledTableData = styled.td`
    padding-left: 1rem;
    padding-right: 1rem;
`

export const StyledIconContainer = styled.button`
    background-color: transparent;
    border: 0;
    color: ${Theme.Color.Gray6};
    cursor: grab;
    margin-right: 1rem;
    margin-top: 0.25rem;
    outline: 0;
    padding: 0;
    transition: color 125ms;

    &:hover {
        color: ${Theme.Color.Gray3};
    }

    svg {
        width: 1.25rem;
    }
`
