import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Bank } from "../assets/bank.svg";

export default class bank extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Bank />
            </Icon>
        );
    }
}
