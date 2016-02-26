/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

export type ReactAdapterOptionsType = {
  elementSelector: string,
  dataSelector: string,
  onRender?: Function
};

export type RenderArgsType = {
  component: Function,
  args: Object,
  options: ReactAdapterOptionsType
};

export type RenderRelayContainerArgsType = {
  relayContainer: Function,
  relayRoute: Object,
  args: Object,
  graphqlUrl: string,
  options: ReactAdapterOptionsType
};

const render = function(params: RenderArgsType) : void {
  const { component, args } = params;
  const options = Object.assign({}, { elementSelector: "#isotropy-container", dataSelector: "#isotropy-data-container" }, params.options);
  const domNode = document.querySelector(options.elementSelector);
  const reactElement = React.createElement(component, args);
  if (options.onRender) {
    options.onRender(reactElement);
  } else {
    ReactDOM.render(reactElement, domNode);
  }
};


const renderRelayContainer = async function(params: RenderRelayContainerArgsType) : Promise {
  const { relayContainer, relayRoute, args, graphqlUrl } = params;
  const options = Object.assign({}, { elementSelector: "#isotropy-container", dataSelector: "#isotropy-data-container" }, params.options);

  const _relayRoute = Object.assign({}, relayRoute);
  _relayRoute.params = Object.assign({}, relayRoute.params, args);

  const rootContainerProps = {
    Component: relayContainer,
    route: _relayRoute
  };

  if (graphqlUrl) {
    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));
  }

  const dataNode = document.querySelector(options.dataSelector);
  if (dataNode) {
    const data = JSON.parse(dataNode.textContent);
    IsomorphicRelay.injectPreparedData(data);
  }
  const relayElement = <IsomorphicRelay.RootContainer {...rootContainerProps} />;
  if (options.onRender) {
    options.onRender(relayElement);
  } else {
    const domNode = document.querySelector(options.elementSelector);
    ReactDOM.render(relayElement, domNode);
  }
};


export default {
  render,
  renderRelayContainer
};
