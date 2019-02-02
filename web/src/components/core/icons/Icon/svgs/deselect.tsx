import * as React from "react";

import { Icon } from "../Icon";
import { ReactComponent as Svg } from "../assets/deselect.svg";
import { InnerProps as Props } from "../types";

export class Deselect extends React.PureComponent<Props> {
    public render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
