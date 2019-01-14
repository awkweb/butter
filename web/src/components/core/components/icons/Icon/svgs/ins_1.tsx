import * as React from "react";
import { Icon } from "../Icon";
import { InnerProps as Props } from "../types";

import { ReactComponent as Ins1 } from "../../../../../../assets/icons/logos/ins_1.svg";

export default class ins_1 extends React.PureComponent<Props> {
    render() {
        return (
            <Icon {...this.props}>
                <Ins1 />
            </Icon>
        );
    }
}
