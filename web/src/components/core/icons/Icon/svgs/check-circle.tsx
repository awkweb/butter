import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Svg } from "../assets/check-circle.svg";

export class CheckCircle extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
