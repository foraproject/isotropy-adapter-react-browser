/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';


export type RenderArgsType = {
  component: Function,
  args: Object,
  elementSelector: string,
  dataSelector: string,
  onRender?: Function
};

export type RenderRelayContainerArgsType = {
  relayContainer: Function,
  relayRoute: Object,
  args: Object,
  graphqlUrl: string,
  elementSelector: string,
  dataSelector: string,
  onRender?: Function
};

const render = function(params: RenderArgsType) : void {
  const { component, args, elementSelector, onRender } = params;
  const domNode = document.querySelector(elementSelector);
  const reactElement = React.createElement(component, args);
  if (onRender) {
    onRender(reactElement);
  } else {
    ReactDOM.render(reactElement, domNode);
  }
};


const renderRelayContainer = async function(params: RenderRelayContainerArgsType) : Promise {
  const { relayContainer, relayRoute, args, graphqlUrl, elementSelector, dataSelector, onRender } = params;

  const _relayRoute = Object.assign({}, relayRoute);
  _relayRoute.params = Object.assign({}, relayRoute.params, args);

  const rootContainerProps = {
    Component: relayContainer,
    route: _relayRoute
  };

  if (graphqlUrl) {
    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));
  }

  const dataNode = document.querySelector(dataSelector);
  if (dataNode) {
    const data = JSON.parse(dataNode.textContent);
    IsomorphicRelay.injectPreparedData(data);
  }
  const relayElement = <IsomorphicRelay.RootContainer {...rootContainerProps} />;
  if (onRender) {
    onRender(relayElement);
  } else {
    const domNode = document.querySelector(elementSelector);
    ReactDOM.render(relayElement, domNode);
  }
};


export default {
  render,
  renderRelayContainer
};
