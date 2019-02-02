import React, { Component } from "react";

import { Box } from "../Box";

/**
 * Use `<Row>` to encapsulate `<Col>`s which need to be vertically separated from other `<Col>`s. The component uses global `flexboxgrid` classes and is modeled off of [Bootstrap’s CSS grid](http://getbootstrap.com/css/#grid).
 *
 * See [`<Grid>`](/#/Layout/Grid) for examples.
 */
export class Row extends Component {
    public render() {
        // In the future, this should use <Row> from react-grid-system
        return (
            <Box
                display={Box.Display.Flex}
                flexWrap={Box.FlexWrap.Wrap}
                flexDirection={Box.FlexDirection.Row}
                justifyContent={Box.JustifyContent.FlexStart}
                alignContent={Box.AlignContent.FlexStart}
                alignItems={Box.AlignItems.FlexStart}
                mh={-1}
            >
                {this.props.children}
            </Box>
        );
    }
}
