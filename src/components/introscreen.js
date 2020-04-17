import React, { useState } from "react";
import Logo from "./Logo.js";
import { useDispatch } from "react-redux";
import { closeIntro } from "../actions";
import IntroText from "./introText";
export default function Intro() {
    const dispatch = useDispatch();
    const [flash, setFlash] = useState(false);
    const [swapLogo, setSwapLogo] = useState(false);

    const close = () => {
        dispatch(closeIntro());
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
            <audio src="/boot_sequence.mp3" autoPlay></audio>
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
                <div className="logo_wrapper">
                    <Logo />
                    <div className="star_wrapper">
                        <h1 id="star_text">2.0!</h1>
                        <img src="/svgs/intro/red_star.png" id="red_star" />
                    </div>
                    <img src="/svgs/intro/sun.svg" id="orange_sun" />
                    <h5 className="enter_site">Click to enter</h5>
                </div>
            )}
        </div>
    );
}
