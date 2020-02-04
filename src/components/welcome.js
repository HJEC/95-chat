import React from "react";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";
import Find from "./find";
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
                        P.T.L.M.W.A.T.C.T.B.T.M.D.M.B.T.W
                    </span>
                    !
                </h1>
                <h2>
                    (people-that-like-movies-with-animals-that-can-talk-but-their-mouths-dont-move-because-thats-weird)
                </h2>
                <img src="dogcat.png" className="dogcat" />
                <HashRouter>
                    <div className="welcome">
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reset" component={Reset} />
                        <Route exact path="/find" component={Find} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
