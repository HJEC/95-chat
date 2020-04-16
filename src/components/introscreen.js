import React, { useEffect, useState } from "react";
import Logo from "./Logo.js";
import { useDispatch } from "react-redux";
import { closeIntro } from "../actions";
import IntroText from "./introText";

export default function Intro() {
    const dispatch = useDispatch();
    const [flash, setFlash] = useState(false);
    const [swapLogo, setSwapLogo] = useState(false);

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
            {!swapLogo && (
                <IntroText
                    changeIntro={() => {
                        setFlash(true);
                        setTimeout(() => {
                            setSwapLogo(true);
                        }, 1000);
                    }}
                />
            )}
            <div className="bar"></div>
            {flash && <div className="flash"></div>}
            {swapLogo && (
                <div>
                    <Logo />
                    <h5 className="enter_site">
                        Click anywhere or press a key to enter &apos;95-chat.
                    </h5>
                </div>
            )}
        </div>
    );
}
