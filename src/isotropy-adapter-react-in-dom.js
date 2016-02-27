/* @flow */
import React from "react";
import ReactDOM from "react-dom";

export type RenderArgsType = {
  component: Function,
  args: Object,
  elementSelector: string,
  dataSelector: string,
  onRender?: Function
};

const render = async function(params: RenderArgsType) : Promise {
  const { component, args, elementSelector, onRender } = params;
  const domNode = document.querySelector(elementSelector);
  const reactElement = React.createElement(component, args);
  if (onRender) {
    onRender(reactElement);
  } else {
    ReactDOM.render(reactElement, domNode);
  }
};

export default {
  render,
};
