import React from "react";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";
import { Box, Text } from "../../../../components";

interface Props {
    id?: string;
}

export default class DateRangePicker extends React.Component<Props> {
    state = {
        startDate: moment(),
        endDate: moment(),
        focusedInput: "startDate"
    };

    formatDates = () => {
        // let formattedDates = ''
        // if (dateOne) {
        //     formattedDates = format(dateOne, 'MMM D')
        // } else {
        //     formattedDates = 'Start'
        // }
        // if (dateOne !== dateTwo) {
        //     if (dateTwo) {
        //         const dateFormat = isSameMonth(dateOne, dateTwo)
        //             ? 'D'
        //             : 'MMM D'
        //         formattedDates = `${formattedDates} - ${format(
        //             dateTwo,
        //             dateFormat,
        //         )}`
        //     } else {
        //         formattedDates = `${formattedDates} - End`
        //     }
        // }
        // return formattedDates
    };

    render() {
        const { id } = this.props;
        const { endDate, focusedInput, startDate } = this.state;
        console.log(id);
        return (
            <Box>
                <Box>
                    <Text>Merp</Text>
                </Box>
                <DayPickerRangeController
                    endDate={endDate}
                    focusedInput={focusedInput as any}
                    hideKeyboardShortcutsPanel
                    isOutsideRange={() => false}
                    numberOfMonths={2}
                    startDate={startDate}
                    onDatesChange={({ startDate, endDate }) =>
                        this.setState({ startDate, endDate })
                    }
                    onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                    }
                />
            </Box>
        );
    }
}
