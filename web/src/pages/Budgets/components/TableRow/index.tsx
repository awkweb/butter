import { toJS } from "mobx";
import React from "react";
import styled from "styled-components";

import { Link, Text } from "../../../../components";
import { prettyNumber } from "../../../../lib/currency";
import { Budget } from "../../../../types/budget";

interface Props {
    id?: string;
    name: string;
    budget?: Budget;
    budgeted: number | undefined;
    spent: number | undefined;
}

export default class TableRow extends React.Component<Props> {
    public render() {
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
                        >
                            {name}
                        </Link>
                    ) : (
                        <Text
                            color={Link.Color.Gray1}
                            weight={Link.Weight.Medium}
                        >
                            {name}
                        </Text>
                    )}
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right}>
                        {prettyNumber(budgeted as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right}>
                        {prettyNumber(spent as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text
                        align={Text.Align.Right}
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
