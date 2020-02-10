import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";
import App from "./components/app";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/registration") {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
