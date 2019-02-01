import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Select from "react-select";
import { BooleanField, Box, Button, Text } from "../../../../components";
import { Budget } from "../../../../types/budget";
import { cssFactory } from "../../../../components/utils/styled-components";
import { css } from "styled-components";
import { ValueType } from "react-select/lib/types";

interface Props {
    budgets: Array<Budget>;
    budgetFilter: string;
    allSelected: boolean;
    anySelected: boolean;
    startDelete: boolean;
    handleOnChange: Function;
    handleCategorize: Function;
    handleDelete: Function;
    handleFilter: Function;
    handleOutsideClick: Function;
}

export default class TableHeader extends React.Component<Props> {
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
        const {
            budgets,
            allSelected,
            anySelected,
            startDelete,
            budgetFilter
        } = this.props;
        const budgetOptions = budgets.map(b => ({
            value: b.id,
            label: b.name
        }));
        const filterOptions = [
            { label: "All Budgets", value: "all" },
            ...budgetOptions
        ];
        const selectedFilterOption = filterOptions.find(
            o => o.value === budgetFilter
        );
        return (
            <Box
                alignItems={Box.AlignItems.Center}
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
                    <Text size={Text.Size.Sm} weight={Text.Weight.Medium}>
                        Showing
                    </Text>
                    <Box css={genBudgetFilterCSS()} ml={1}>
                        <Select
                            classNamePrefix="react-select"
                            components={{
                                DropdownIndicator: null,
                                IndicatorSeparator: null
                            }}
                            isSearchable={false}
                            maxMenuHeight={200}
                            menuPlacement="auto"
                            placeholder="All Budgets"
                            options={filterOptions}
                            value={selectedFilterOption}
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
                        <Box css={genBudgetFilterCSS()}>
                            <Select
                                classNamePrefix="react-select"
                                components={{
                                    DropdownIndicator: null,
                                    IndicatorSeparator: null
                                }}
                                isSearchable={false}
                                maxMenuHeight={200}
                                menuPlacement="auto"
                                placeholder="Add to"
                                options={budgetOptions}
                                value={{ label: "Add to", value: "-1" }}
                                onChange={this.onChangeSelect}
                            />
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        );
    }
}

const genBudgetFilterCSS = () =>
    cssFactory(css)`
	.react-select__control {
        border-color: ${props => props.theme.colors.gray8};
        font-weight: ${props => props.theme.text.getWeight(Text.Weight.Medium)};
        font-size: ${props => props.theme.text.getSize(Text.Size.Xs)};
        height: 37px;
        min-height: 37px;
        
        &:hover {
            border-color: ${props => props.theme.colors.gray8};
        }
    }

    .react-select__single-value {
		color: ${props => props.theme.colors.gray1};
    }

    .react-select__single-value {
        max-width: none;
        overflow: visible;
        position: relative;
        top: auto;
        transform: none;
    }

    .react-select__menu {
        top: 45px !important;
        width: max-content;
    }

    .react-select__option {
		font-size: ${props => props.theme.text.getSize(Text.Size.Xs)};
    }
`;
