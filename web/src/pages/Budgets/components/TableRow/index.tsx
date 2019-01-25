import React from "react";
import styled from "styled-components";
import { Text, Link } from "../../../../components";
import { prettyNumber } from "../../../../lib/currency";
import { Budget } from "../../../../types/budget";
import { toJS } from "mobx";

interface Props {
    id?: string;
    name: string;
    budget?: Budget;
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
                    {id ? (
                        <Link
                            color={Link.Color.Blue2}
                            to={{
                                pathname: `/budgets/${id}`,
                                state: { budget: toJS(budget) }
                            }}
                            weight={Link.Weight.Medium}
                            size={Text.Size.Sm}
                        >
                            {name}
                        </Link>
                    ) : (
                        <Text color={Link.Color.Gray1} size={Text.Size.Sm}>
                            {name}
                        </Text>
                    )}
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} size={Text.Size.Sm}>
                        {prettyNumber(budgeted as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} size={Text.Size.Sm}>
                        {prettyNumber(spent as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text
                        align={Text.Align.Right}
                        size={Text.Size.Sm}
                        color={
                            remaining < 0 ? Text.Color.Red2 : Text.Color.Gray1
                        }
                    >
                        {prettyNumber(remaining)}
                    </Text>
                </StyledTableData>
            </StyledTableRow>
        );
    }
}

const StyledTableRow = styled.tr`
    td {
        border-bottom: 1px solid ${props => props.theme.colors.gray9};
        padding-bottom: 1rem;
        padding-top: 1rem;
        &:first-child {
            border-right: 1px solid ${props => props.theme.colors.gray9};
        }
    }

    &:nth-last-child(2) {
        td {
            border-bottom-color: ${props => props.theme.colors.gray7};
        }
    }

    &:last-child {
        td {
            border: 0;
        }
    }
`;

const StyledTableData = styled.td`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;
