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
                <h1 className="title">
                    Welcome to{" "}
                    <span className="sub_title">
                        P.T.L.M.W.A.C.T.B.T.M.D.A.M.B.T.W
                    </span>
                    !
                </h1>
                <img src="dogcat.png" className="dogcat" />
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
