import * as React from "react";

import { Icon } from "../../Icon";
import { ReactComponent as Svg } from "../../assets/logos/ins_51.svg";
import { InnerProps as Props } from "../../types";

// tslint:disable-next-line
export default class ins_51 extends React.PureComponent<Props> {
    public render() {
        return (
            <Icon {...this.props}>
                <Svg />
            </Icon>
        );
    }
}
