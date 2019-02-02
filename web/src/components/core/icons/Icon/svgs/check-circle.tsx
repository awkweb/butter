import * as React from "react";

import { Icon } from "../Icon";
import { ReactComponent as Svg } from "../assets/check-circle.svg";
import { InnerProps as Props } from "../types";

export class CheckCircle extends React.PureComponent<Props> {
    public render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
