import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

console.log("Start JS.");
console.log("location: ", location.pathname);

let elem;

if (location.pathname == "/registration") {
    elem = <Welcome />;
} else {
    elem = <img src="/spongebob.gif" />;
}

ReactDOM.render(elem, document.querySelector("main"));
