import React from "react";
import Registration from "./registration";
import HeaderBar from "./headerBar";
import Login from "./login";
import Reset from "./reset";
import { HashRouter, Route } from "react-router-dom";
import { Pixelify } from "react-pixelify";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="welcome">
                <HeaderBar />
                <img src="/svgs/95chat.svg" alt="95chat logo" id="chat_logo" />
                <Pixelify
                    src={"dogcat.png"}
                    pixelSize={3}
                    className="dogcat"
                    fillTransparencyColor="rgba(148, 143, 249, 0)"
                    width={280}
                    height={170}
                    id="dogcat"
                />
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
// <h1 className="welcome_title">
//     Welcome to{" "}
//     <span className="sub_title">
//         P.T.L.M.W.A.T.C.T.B.T.M.D.M.B.T.W
//     </span>
//     !
// </h1>

// <h2>
//     (people-that-like-movies-with-animals-that-can-talk-but-their-mouths-dont-move-because-thats-weird)
// </h2>
