import React from "react";
import Logo from "./Logo.js";
import { useDispatch } from "react-redux";
import { closeIntro } from "../actions";

export default function Intro() {
    const dispatch = useDispatch();

    const close = () => {
        dispatch(closeIntro());
        let time = new Date().getMinutes();
        localStorage.setItem("intro_closed", time);
    };
    return (
        <div className="intro-wrapper">
            <div
                className="bar"
                onClick={() => {
                    close();
                }}
            ></div>
            <Logo />
            <h5 className="enter_site">
                Click anywhere or press a key to enter &apos;95-chat.
            </h5>
        </div>
    );
}
