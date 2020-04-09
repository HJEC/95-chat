import React, { useEffect } from "react";
import Logo from "./Logo.js";
import { useDispatch } from "react-redux";
import { closeIntro } from "../actions";
import IntroText from "./introText";

export default function Intro() {
    const dispatch = useDispatch();

    const close = () => {
        // dispatch(closeIntro());
        let time = new Date().getMinutes();
        localStorage.setItem("intro_closed", time);
    };
    return (
        <div
            className="intro-wrapper"
            onClick={() => {
                close();
            }}
        >
            <IntroText />
            <div className="bar"></div>
            <Logo />
            <h5 className="enter_site">
                Click anywhere or press a key to enter &apos;95-chat.
            </h5>
        </div>
    );
}
