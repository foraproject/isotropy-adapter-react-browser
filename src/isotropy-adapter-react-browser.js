/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import Relay from 'react-relay';

import type { KoaContextType } from "./flow/koa-types";

export type ReactAdapterOptionsType = {
    elementSelector: string;
}

export type RenderArgsType = {
    component: Function,
    args: Object,
    context: KoaContextType,
    options: ReactAdapterOptionsType
}

export type RenderRelayContainerArgsType = {
    relayContainer: Function,
    relayRoute: Object,
    args: Object,
    graphqlUrl: string,
    context: KoaContextType,
    options: ReactAdapterOptionsType
}

const render = function(params: RenderArgsType) : void {
    const { component, args, context } = params;
    const options = params.options || { elementSelector: "#isotropy-container" };
    const domNode = document.querySelector(options.elementSelector);
    const reactElement = React.createElement(component, args);
    ReactDOM.render(reactElement, domNode);
};


const renderRelayContainer = async function(params: RenderRelayContainerArgsType) : Promise {
    const { relayContainer, relayRoute, args, context, graphqlUrl, options } = params;

    const _relayRoute = Object.assign({}, relayRoute);
    _relayRoute.params = Object.assign({}, relayRoute.params, args);

    const rootContainerProps = {
        Component: relayContainer,
        route: _relayRoute
    };

    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));

    const relayElement = <Relay.RootContainer {...rootContainerProps} />;
    const domNode = document.querySelector(options.elementSelector);
    ReactDOM.render(relayElement, domNode);
};


export default {
    render,
    renderRelayContainer
};
