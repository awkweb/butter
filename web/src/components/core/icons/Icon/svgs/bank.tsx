import * as React from "react";

import { Icon } from "../Icon";
import { ReactComponent as BankSvg } from "../assets/bank.svg";
import { InnerProps as Props } from "../types";

export default class Bank extends React.PureComponent<Props> {
    public render() {
        return (
            <Icon {...this.props}>
                <BankSvg />
            </Icon>
        );
    }
}
