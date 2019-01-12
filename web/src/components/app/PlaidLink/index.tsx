import React from "react";
import { Button } from "../../index";

interface Props {
    apiVersion?: string;
    children?: React.ReactNode;
    clientName?: string;
    env: string;
    institution?: string;
    onClick?: Function;
    onEvent?: Function;
    onExit?: Function;
    onLoad?: Function;
    onSuccess: Function;
    noBackground: boolean;
    noBorder: boolean;
    product?: Array<string>;
    publicKey?: string;
    selectAccount?: boolean;
    token?: string;
    webhook?: string;
}

/**
 * Modified from [`react-plaid-link`](https://github.com/pbernasconi/react-plaid-link/blob/master/src/PlaidLink.js)
 */
export class PlaidLink extends React.Component<Props> {
    state = {
        disabledButton: true,
        linkLoaded: false,
        initializeURL: "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
    };

    static defaultProps = {
        apiVersion: "v2",
        clientName: "Wilbur",
        env: (process.env.REACT_APP_PLAID_ENV as string) || "sandbox",
        institution: null,
        noBackground: false,
        noBorder: false,
        product: ["transactions"],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
        selectAccount: true,
        token: null,
        webhook:
            process.env.NODE_ENV === "production"
                ? "https://api.wilbur.app/v1/items/hooks/"
                : "http://c9080a24.ngrok.io/v1/items/hooks/"
    };

    async componentWillMount() {
        try {
            const { initializeURL } = this.state;
            await this.loadScript(initializeURL);
            this.onScriptLoaded();
        } catch (e) {
            this.onScriptError();
        }
    }

    loadScript = (src: string) => {
        return new Promise(function(resolve, reject) {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const el = document.createElement("script");
            el.type = "text/javascript";
            el.async = true;
            el.src = src;
            el.addEventListener("load", resolve);
            el.addEventListener("error", reject);
            el.addEventListener("abort", reject);
            document.head.appendChild(el);
        });
    };

    onScriptError = () => {
        console.error(
            "There was an issue loading the link-initialize.js script"
        );
    };

    onScriptLoaded = () => {
        const reactWindow = window as any;
        const {
            apiVersion,
            clientName,
            env,
            publicKey,
            onExit,
            onEvent,
            onSuccess,
            product,
            selectAccount,
            token,
            webhook
        } = this.props;
        reactWindow.linkHandler = reactWindow.Plaid.create({
            apiVersion,
            clientName,
            env,
            onExit,
            onEvent,
            onSuccess,
            product,
            selectAccount,
            token,
            webhook,
            key: publicKey,
            onLoad: this.handleLinkOnLoad
        });

        this.setState({ disabledButton: false });
    };

    handleLinkOnLoad = () => {
        const { onLoad } = this.props;
        if (onLoad != null) onLoad();
        this.setState({ linkLoaded: true });
    };

    handleOnClick = () => {
        const { institution, onClick } = this.props;
        if (onClick != null) onClick();
        const reactWindow = window as any;
        if (reactWindow.linkHandler) {
            reactWindow.linkHandler.open(institution);
        }
    };

    exit = (configurationObject: object) => {
        const reactWindow = window as any;
        if (reactWindow.linkHandler) {
            reactWindow.linkHandler.exit(configurationObject);
        }
    };

    render() {
        const { disabledButton } = this.state;
        const { children, noBackground, noBorder } = this.props;
        return (
            <Button
                disabled={disabledButton}
                noBackground={noBackground}
                noBorder={noBorder}
                onClick={this.handleOnClick}
            >
                {children}
            </Button>
        );
    }
}
