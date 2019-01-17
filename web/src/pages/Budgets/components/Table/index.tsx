import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../../components";
import { Budget } from "../../../../types/budget";
import TableRow from "../TableRow";

interface Props {
    budgets: Array<Budget>;
    total: { [name: string]: any };
}

export default class Table extends React.Component<Props> {
    render() {
        const { budgets, total } = this.props;
        return (
            <Box
                backgroundColor={Box.BackgroundColor.White}
                cornerRadius={Box.CornerRadius.Small}
                css={`
                    overflow-x: scroll;
                `}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <th>
                                <Text
                                    align={Text.Align.Left}
                                    color={Text.Color.Gray1}
                                    size={Text.Size.Sm}
                                >
                                    Name
                                </Text>
                            </th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray1}
                                    size={Text.Size.Sm}
                                >
                                    Budgeted
                                </Text>
                            </th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray1}
                                    size={Text.Size.Sm}
                                >
                                    Spent
                                </Text>
                            </th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray1}
                                    size={Text.Size.Sm}
                                >
                                    Remaining
                                </Text>
                            </th>
                        </tr>
                    </StyledTableHeader>
                    <tbody>
                        {budgets.map(budget => (
                            <TableRow
                                key={budget.id}
                                id={budget.id}
                                name={budget.name}
                                budget={budget}
                                budgeted={budget.budgeted}
                                spent={budget.spent}
                            />
                        ))}
                        <TableRow
                            name={total.name}
                            budgeted={total.budgeted}
                            spent={total.spent}
                        />
                    </tbody>
                </StyledTable>
            </Box>
        );
    }
}

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
`;

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.white};
    th {
        border-bottom: 1px solid ${props => props.theme.colors.gray7};
        padding: 0 1.5rem 0.75rem;
        word-break: normal;
    }
`;
