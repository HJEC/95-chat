import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="welcome">
                <h1>Welcome!</h1>
                <img src="siphon_philter.jpg" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
