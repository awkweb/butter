import moment, { Moment } from "moment";
import React from "react";
import { DayPickerRangeController } from "react-dates";
import { css } from "styled-components";

import { Box, Text } from "../../../../components";
import { cssFactory } from "../../../../components/utils/styled-components";

interface Props {
    startDate: Moment | null;
    endDate: Moment | null;
    handleDatesChange: (
        startDate: Moment | null,
        endDate: Moment | null
    ) => void;
    handleClose: (startDate: Moment, endDate: Moment | null) => void;
}

export default class DateRangePicker extends React.Component<Props> {
    public state = {
        focusedInput: "startDate",
        isOpen: false
    };

    public render() {
        const { endDate, startDate } = this.props;
        const { focusedInput, isOpen } = this.state;
        return (
            <Box position={Box.Position.Relative}>
                <Box
                    b={true}
                    cornerRadius={Box.CornerRadius.Small}
                    ph={2}
                    pv={1}
                    onClick={this.onClickButton}
                >
                    <Text size={Text.Size.Sm} weight={Text.Weight.Medium}>
                        {this.displayText()}
                    </Text>
                </Box>
                {isOpen && (
                    <Box
                        css={genDayPickerRangeControllerContainer()}
                        position={Box.Position.Absolute}
                    >
                        <DayPickerRangeController
                            endDate={endDate}
                            focusedInput={focusedInput as any}
                            hideKeyboardShortcutsPanel={true}
                            isOutsideRange={this.isOutsideRange}
                            startDate={startDate}
                            onDatesChange={this.onDatesChange}
                            onFocusChange={this.onFocusChange}
                            onOutsideClick={this.onOutsideClick}
                        />
                    </Box>
                )}
            </Box>
        );
    }

    private onDatesChange = (arg: {
        startDate: Moment | null;
        endDate: Moment | null;
    }) => {
        const { startDate, endDate } = arg;
        this.props.handleDatesChange(startDate, endDate);
    };

    private onFocusChange = (focusedInput: "startDate" | "endDate" | null) => {
        this.setState({ focusedInput });
        if (!focusedInput) {
            this.setState({ isOpen: false });
            setTimeout(() => {
                const { endDate, startDate, handleClose } = this.props;
                handleClose(startDate as Moment, endDate);
            });
        }
    };

    private onClickButton = () => {
        const { isOpen } = this.state;
        this.onFocusChange("startDate");
        this.setState({ isOpen: !isOpen });
    };

    private onOutsideClick = () => {
        this.onFocusChange(null);
    };

    private isOutsideRange = () => false;

    private displayText = () => {
        const { startDate, endDate } = this.props;
        const dateOne = startDate && moment(startDate);
        const dateTwo = endDate && moment(endDate);
        let formattedDates = dateOne ? dateOne.format("MMM D") : "Start";
        if (dateOne && !dateOne.isSame(dateTwo as Moment, "day")) {
            if (dateTwo) {
                const dateFormat = dateOne.isSame(dateTwo, "month")
                    ? "D"
                    : "MMM D";
                formattedDates = `${formattedDates} - ${dateTwo.format(
                    dateFormat
                )}`;
            } else {
                formattedDates = `${formattedDates} - End`;
            }
        }
        return formattedDates;
    };
}

const genDayPickerRangeControllerContainer = () =>
    cssFactory(css)`
    background-color: ${props => props.theme.colors.white};
    right: 0;
    top: 3rem;
    z-index: ${props => props.theme.zIndex.Z_INDEX_2};
`;
