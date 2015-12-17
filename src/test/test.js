import __polyfill from "babel-polyfill";
import React from "react";
import should from 'should';
import jsdom from 'jsdom';
import fetch from "isomorphic-fetch";
import adapter from "../isotropy-adapter-react-browser";
import schema from "./my-schema";
import MyComponent from "./my-component";
import MyRelayComponent from "./my-relay-component";
import MyRelayRoute from "./my-relay-route";

//For now the GraphQL server is going to run as a separate process.
import express from 'express';
import graphQLHTTP from 'express-graphql';

// isomorphic-relay must be loaded before react-relay (happens in isotropy-adapter-react)
// or you get "self is not defined"
// https://github.com/denvned/isomorphic-relay/commit/5a7b673250bd338f3333d00075336ffcc73be806
import Relay from "react-relay";


const setupJSDOM = function() {
    const document = jsdom.jsdom('<!doctype html><html><body><div id="isotropy-container"></div></body></html>');
    global.document = document;
    global.window = document.defaultView;
    global.window.fetch = fetch;
    global.fetch = fetch;
};


describe("Isotropy browser adapter for React (incomplete tests)", () => {

    before(() => {
        // Expose a GraphQL endpoint
        const app = express();
        app.use('/graphql', graphQLHTTP({schema, pretty: true}));
        app.listen(8080);
    });


    it(`Should serve a React UI`, () => {
        setupJSDOM();
        const component = MyComponent;
        const context = {};
        const options = {
            elementSelector: "#isotropy-container"
        };
        adapter.render({
            component,
            args: { name: "Jeswin"},
            context,
            options
        });
        document.querySelector("body").innerHTML.should.containEql(`Jeswin`)
    });
});
