import React from "react";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";
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
                    <div className="welcome">
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reset" component={Reset} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
