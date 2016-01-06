/* @flow */
import React from "react";
import ReactDOM from "react-dom";
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
    const options = params.options || { elementSelector: "#isotropy-container", dataSelector: "#isotropy-data-container" };
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

    if (graphqlUrl) {
        Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));
    }

    const data = JSON.parse(document.querySelector(options.dataSelector).textContent);
    IsomorphicRelay.injectPreparedData(data);
    const relayElement = <IsomorphicRelay.RootContainer {...rootContainerProps} />;
    const domNode = document.querySelector(options.elementSelector);
    ReactDOM.render(relayElement, domNode);
};


export default {
    render,
    renderRelayContainer
};
