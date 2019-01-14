import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Ins3 } from "../../../../../../assets/icons/logos/ins_3.svg";

export default class ins_3 extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Ins3 />
            </Icon>
        );
    }
}
