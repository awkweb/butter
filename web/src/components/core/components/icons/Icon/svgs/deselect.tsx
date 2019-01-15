import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Svg } from "../assets/deselect.svg";

export class Deselect extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
