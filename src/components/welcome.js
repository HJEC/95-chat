import React from "react";
import { useSelector } from "react-redux";
import Registration from "./registration";
import HeaderBar from "./headerBar";
import Login from "./login";
import Info from "./info";
import Reset from "./reset";
import { HashRouter, Route } from "react-router-dom";
import { Pixelify } from "react-pixelify";

export default function Welcome() {
    const showInfo = useSelector(state => state.showInfo);
    return (
        <div className="welcome">
            <div className="crt_black">
                <div className="crt_window" />
            </div>
            <HeaderBar />
            <img src="/svgs/95chat.svg" alt="95chat logo" id="chat_logo" />
            <div className="welcome_right">
                <Pixelify
                    src={"dogcat.png"}
                    pixelSize={3}
                    fillTransparencyColor="rgba(148, 143, 249, 0)"
                    width={280}
                    height={170}
                />
                {showInfo && <Info />}
                <HashRouter>
                    <div className="">
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reset" component={Reset} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
