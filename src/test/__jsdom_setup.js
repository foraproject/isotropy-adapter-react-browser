import jsdom from "jsdom";
import fetch from "isomorphic-fetch";

const setupJSDOM = function() {
  const document = jsdom.jsdom('<!doctype html><html><body><div id="isotropy-container"></div></body></html>');
  global.document = document;
  global.window = document.defaultView;
  global.window.fetch = fetch;
  global.history = document.history;
  global.navigator = window.navigator;
  global.fetch = fetch;
  global.navigator = { userAgent: "Node.JS" };
};

setupJSDOM();

export default setupJSDOM;
