import React from "react";
import { toJS } from "mobx";
import { Box, Text, Link } from "../../../../components";
import { prettyNumber } from "../../../../lib/currency";
import { BooleanField } from "../../../../components/core/components/form/BooleanField";
import { Transaction } from "../../../../types/transaction";
import styled from "styled-components";

interface Props {
    amountCents: number;
    accountName?: number;
    accountMask?: number;
    budgetName?: string;
    checked: boolean;
    date: string;
    id: string;
    name: string;
    transaction?: Transaction;
    handleChange: Function;
}

export default class TableRow extends React.Component<Props> {
    onChange = () => {
        const { id, handleChange } = this.props;
        handleChange(id);
    };

    render() {
        const {
            accountMask,
            accountName,
            amountCents,
            budgetName,
            checked,
            date,
            id,
            name,
            transaction
        } = this.props;
        return (
            <StyledTableRow>
                <StyledTableData>
                    <Box display={Box.Display.Flex}>
                        <Box mr={2.5} mt={0.7}>
                            <BooleanField
                                id={`transactions-${id}`}
                                checked={checked}
                                onChange={this.onChange}
                            />
                        </Box>
                        <Box>
                            <Link
                                to={{
                                    pathname: `/transactions/${id}`,
                                    state: { transaction: toJS(transaction) }
                                }}
                            >
                                <Text
                                    color={Link.Color.Blue2}
                                    whiteSpace={Text.WhiteSpace.NoWrap}
                                    weight={Link.Weight.Medium}
                                    size={Text.Size.Sm}
                                >
                                    {name}
                                </Text>
                            </Link>
                            <Text
                                color={Text.Color.Gray3}
                                size={Text.Size.Xs}
                                whiteSpace={Text.WhiteSpace.NoWrap}
                            >
                                {date}
                                {accountMask &&
                                    accountName &&
                                    ` ∙ ${accountName} - ${accountMask}`}
                            </Text>
                        </Box>
                    </Box>
                </StyledTableData>
                <StyledTableData>
                    {budgetName && (
                        <Text size={Text.Size.Sm}>{budgetName}</Text>
                    )}
                </StyledTableData>
                <StyledTableData>
                    <Text
                        align={Text.Align.Right}
                        color={Text.Color.Gray2}
                        size={Text.Size.Sm}
                    >
                        {prettyNumber(amountCents)}
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
    }

    &:first-child {
        td {
            border-top: 1px solid ${props => props.theme.colors.gray7};
        }
    }

    &:last-child {
        td {
            border-bottom-color: ${props => props.theme.colors.gray7};
        }
    }
`;

const StyledTableData = styled.td`
    padding-left: 1rem;
    padding-right: 1rem;
`;
