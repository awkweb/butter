import React from "react";
import { DayPickerRangeController } from "react-dates";
import moment, { Moment } from "moment";
import { Box, Text } from "../../../../components";
import { cssFactory } from "../../../../components/utils/styled-components";
import { css } from "styled-components";

interface Props {
    startDate: Moment | null;
    endDate: Moment | null;
    handleDatesChange: Function;
    handleClose: Function;
}

export default class DateRangePicker extends React.Component<Props> {
    state = {
        focusedInput: "startDate",
        isOpen: false
    };

    displayText = () => {
        const { startDate, endDate } = this.props;
        const dateOne = startDate && moment(startDate);
        const dateTwo = endDate && moment(endDate);
        let formattedDates = "";
        if (dateOne) {
            formattedDates = dateOne.format("MMM D");
        } else {
            formattedDates = "Start";
        }
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

    onDatesChange = (arg: {
        startDate: Moment | null;
        endDate: Moment | null;
    }) => {
        const { startDate, endDate } = arg;
        this.props.handleDatesChange(startDate, endDate);
    };

    onFocusChange = (focusedInput: "startDate" | "endDate" | null) => {
        this.setState({ focusedInput });
        if (!focusedInput) {
            this.setState({ isOpen: false });
            setTimeout(() => {
                const { endDate, startDate, handleClose } = this.props;
                handleClose(startDate, endDate);
            });
        }
    };

    onClickButton = () => {
        const { isOpen } = this.state;
        this.onFocusChange("startDate");
        this.setState({ isOpen: !isOpen });
    };

    onOutsideClick = () => {
        this.onFocusChange(null);
    };

    render() {
        const { endDate, startDate } = this.props;
        const { focusedInput, isOpen } = this.state;
        return (
            <Box position={Box.Position.Relative}>
                <Box
                    b
                    cornerRadius={Box.CornerRadius.Small}
                    ph={2}
                    pv={1}
                    onClick={this.onClickButton}
                >
                    <Text size={Text.Size.Xs} weight={Text.Weight.Medium}>
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
                            hideKeyboardShortcutsPanel
                            isOutsideRange={() => false}
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
}

const genDayPickerRangeControllerContainer = () =>
    cssFactory(css)`
    background-color: ${props => props.theme.colors.white};
    right: 0;
    top: 3rem;
    z-index: ${props => props.theme.zIndex.Z_INDEX_2};
`;
