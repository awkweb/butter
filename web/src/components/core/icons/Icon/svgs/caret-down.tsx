import * as React from "react";

import { Icon } from "../Icon";
import { ReactComponent as Svg } from "../assets/caret-down.svg";
import { InnerProps as Props } from "../types";

export class CaretDown extends React.PureComponent<Props> {
    public render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
