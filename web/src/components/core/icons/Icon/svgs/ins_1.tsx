import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Svg } from "../assets/logos/ins_1.svg";

export default class ins_1 extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
