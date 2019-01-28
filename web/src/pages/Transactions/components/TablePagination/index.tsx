import React from "react";
// import styled from "styled-components";
import { Box } from "../../../../components";
import { range } from "lodash";

interface Props {
    nextDisabled: boolean;
    prevDisabled: boolean;
    pagesCount: number;
}

export default class TablePagination extends React.Component<Props> {
    getPageNumberButtons = () => {
        const { pagesCount } = this.props;
        return range(1, pagesCount + 1).map(i => <button key={i}>{i}</button>);
    };

    render() {
        const { nextDisabled, prevDisabled } = this.props;
        return (
            <Box
                display={Box.Display.Flex}
                justifyContent={Box.JustifyContent.Center}
            >
                <button disabled={prevDisabled}>Previous</button>
                {this.getPageNumberButtons()}
                <button disabled={nextDisabled}>Next</button>
            </Box>
        );
    }
}

// const StyledTable = styled.table`
//     border-collapse: separate;
//     border-spacing: 0;
//     width: 100%;
// `;
