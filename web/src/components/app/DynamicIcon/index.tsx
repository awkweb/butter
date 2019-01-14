import * as React from "react";
// import { Box } from "../../index";
import { ReactComponent as Icon } from "../../../assets/icons/logos/ins_51.svg";

interface Props {
    path: string;
}

export class DynamicIcon extends React.Component<Props> {
    state = { module: undefined };

    async componentDidMount() {
        // const { path } = this.props;
        // try {
        //     const module = await import(`${path}`);
        //     console.log(module);
        //     this.setState({ module: module.default });
        // } catch (e) {
        //     console.log(e);
        // }
    }

    render() {
        return <Icon />;
        // const { module: Component }: { module: any } = this.state;
        // return <Box>{Component && <Component />}</Box>;
    }
}
