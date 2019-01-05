import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../../components";
import { Budget } from "../../../../types/budget";
import TableRow from "../TableRow";

interface Props {
    budgets: Array<Budget>;
}

export default class Table extends React.Component<Props> {
    render() {
        const { budgets } = this.props;
        return (
            <Box
                b
                backgroundColor={Box.BackgroundColor.White}
                borderColor={Box.BorderColor.Gray8}
                cornerRadius={Box.CornerRadius.Small}
                css={`
                    overflow-x: scroll;
                `}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <th>&nbsp;</th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray3}
                                    size={Text.Size.Xxs}
                                    transform={Text.Transform.Uppercase}
                                    weight={Text.Weight.Bold}
                                >
                                    Remaining
                                </Text>
                            </th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray3}
                                    size={Text.Size.Xxs}
                                    transform={Text.Transform.Uppercase}
                                    weight={Text.Weight.Bold}
                                >
                                    Spent
                                </Text>
                            </th>
                            <th>
                                <Text
                                    align={Text.Align.Right}
                                    color={Text.Color.Gray3}
                                    size={Text.Size.Xxs}
                                    transform={Text.Transform.Uppercase}
                                    weight={Text.Weight.Bold}
                                >
                                    Budgeted
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
    background-color: ${props => props.theme.colors.gray10};
    th {
        border-bottom: 1px solid ${props => props.theme.colors.gray8};
        padding: 0.7rem 1rem;
        word-break: normal;
    }
`;
