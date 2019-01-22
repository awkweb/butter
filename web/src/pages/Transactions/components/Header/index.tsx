import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Select from "react-select";
import { Box, Button, Text } from "../../../../components";
import { BooleanField } from "../../../../components/core/components/form/BooleanField";
import { Budget } from "../../../../types/budget";
import { cssFactory } from "../../../../components/core/utils/styled-components";
import { css } from "styled-components";
import { ValueType } from "react-select/lib/types";

interface Props {
    budgets: Array<Budget>;
    allSelected: boolean;
    anySelected: boolean;
    startDelete: boolean;
    handleOnChange: Function;
    handleCategorize: Function;
    handleDelete: Function;
    handleFilter: Function;
    handleOutsideClick: Function;
}

export default class Header extends React.Component<Props> {
    onChange = () => {
        this.props.handleOnChange();
    };

    onChangeSelect = (
        value: ValueType<{
            value: string;
            label: string;
        }>
    ) => {
        if (value) {
            const budgetId = (value as any).value;
            this.props.handleCategorize(budgetId);
        }
    };

    onChangeFilter = (
        value: ValueType<{
            value: string;
            label: string;
        }>
    ) => {
        if (value) {
            const budgetId = (value as any).value;
            this.props.handleFilter(budgetId);
        }
    };

    onClickDelete = () => {
        this.props.handleDelete();
    };

    onOutsideClick = () => {
        this.props.handleOutsideClick();
    };

    render() {
        const { budgets, allSelected, anySelected, startDelete } = this.props;
        const options = budgets.map(b => ({
            value: b.id,
            label: b.name
        }));
        return (
            <Box
                alignItems={Box.AlignItems.Center}
                bb
                borderColor={Box.BorderColor.Gray7}
                css={`
                    height: 50px;
                `}
                display={Box.Display.Flex}
                ph={2}
                pb={1.5}
            >
                <Box mr={2.5}>
                    <BooleanField
                        checked={anySelected || allSelected}
                        deselect={anySelected && !allSelected}
                        onChange={this.onChange}
                    />
                </Box>
                <Box
                    alignItems={Box.AlignItems.Center}
                    display={Box.Display.Flex}
                    mr={2}
                >
                    <Text size={Text.Size.Sm} weight={Text.Weight.SemiBold}>
                        Showing
                    </Text>
                    <Box css={genInputCSS()} ml={1}>
                        <Select
                            classNamePrefix="react-select"
                            components={{ IndicatorSeparator: null }}
                            menuPlacement="auto"
                            placeholder="All Budgets"
                            options={options}
                            value={undefined}
                            onChange={this.onChangeFilter}
                        />
                    </Box>
                </Box>
                {anySelected && (
                    <React.Fragment>
                        <Box mr={2}>
                            <OutsideClickHandler
                                onOutsideClick={this.onOutsideClick}
                            >
                                <Button
                                    color={Button.Color.Secondary}
                                    onClick={this.onClickDelete}
                                >
                                    {startDelete ? "Really delete?" : "Delete"}
                                </Button>
                            </OutsideClickHandler>
                        </Box>
                        <Box css={genInputCSS()}>
                            <Select
                                classNamePrefix="react-select"
                                components={{ IndicatorSeparator: null }}
                                menuPlacement="auto"
                                placeholder="Add to"
                                options={options}
                                value={undefined}
                                onChange={this.onChangeSelect}
                            />
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        );
    }
}

const genInputCSS = () =>
    cssFactory(css)`
	.react-select__control {
		background-color: ${props => props.theme.colors.white};
		border-radius: ${props => props.theme.cornerRadii.default};
		box-sizing: border-box;
		color: ${props => props.theme.colors.gray1};
		font-family: ${props => props.theme.text.getFont()};
		height: 37px;
        max-width: 130px;
        min-width: 130px;
		padding: 0;
		outline: 0;
		transition: border-color 125ms;
    }

    .react-select__menu {
        width: max-content;
    }
`;
