import __polyfill from "babel-polyfill";
import setupJSDOM from "./__jsdom_setup";
import React from "react";
import ReactDOM from "react-dom";
import should from 'should';
import jsdom from 'jsdom';
import fetch from "isomorphic-fetch";
import adapter from "../isotropy-adapter-react-in-dom";
import MyComponent from "./my-component";

describe("Isotropy browser adapter for React (incomplete tests)", () => {

  it(`Renders a React UI`, () => {
    setupJSDOM();
    const component = MyComponent;
    const context = {};

    adapter.render({
      component,
      args: { name: "Jeswin"},
      context,
      elementSelector: "#isotropy-container"
    });
    document.querySelector("body").innerHTML.should.containEql(`Jeswin`);
  });


  it(`Calls onRender`, () => {
    setupJSDOM();
    const component = MyComponent;
    const context = {};
    let onRenderCalled = false;

    adapter.render({
      component,
      args: { name: "Jeswin"},
      context,
      onRender: function() {
        onRenderCalled = true;
      }
    });
    onRenderCalled.should.be.true();
  });

});
