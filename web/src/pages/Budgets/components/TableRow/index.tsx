import React from "react";
import styled from "styled-components";
import { Text, Link } from "../../../../components";
import { prettyNumber } from "../../../../utils";
import { Budget } from "../../../../types/budget";
import { toJS } from "mobx";

interface Props {
    id: string;
    name: string;
    budget: Budget;
    budgeted?: number;
    spent?: number;
}

export default class TableRow extends React.Component<Props> {
    render() {
        const { id, name, budget, budgeted, spent } = this.props;
        const remaining = (budgeted as number) - (spent as number);
        return (
            <StyledTableRow>
                <StyledTableData>
                    <Link
                        color={Link.Color.Blue2}
                        size={Link.Size.Sm}
                        to={{
                            pathname: `/budgets/${id}`,
                            state: { budget: toJS(budget) }
                        }}
                        weight={Link.Weight.SemiBold}
                    >
                        {name}
                    </Link>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} size={Text.Size.Sm}>
                        {prettyNumber(remaining)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} size={Text.Size.Sm}>
                        {prettyNumber(spent as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} size={Text.Size.Sm}>
                        ${prettyNumber(budgeted as number)}
                    </Text>
                </StyledTableData>
            </StyledTableRow>
        );
    }
}

const StyledTableRow = styled.tr`
    &:last-child {
        td {
            border-bottom: 0;
        }
    }

    td {
        border-bottom: 1px solid ${props => props.theme.colors.gray8};
        padding-bottom: 1rem;
        padding-top: 1rem;
        &:first-child {
            border-right: 1px solid ${props => props.theme.colors.gray9};
        }
    }
`;

const StyledTableData = styled.td`
    padding-left: 1rem;
    padding-right: 1rem;
`;
