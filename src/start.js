import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";
import App from "./components/app";

console.log("start.js location: ", location.pathname);

let elem;

if (location.pathname == "/registration") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
