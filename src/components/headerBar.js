import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWindow } from "../actions";

export default function HeaderBar(props) {
    const dispatch = useDispatch();
    const [time, setTime] = useState();
    const [showSelect, setShowSelect] = useState();

    setInterval(() => {
        setTime(new Date().toLocaleString());
    }, 1000);

    const logInHeader = (
        <div id="links_container">
            <p
                className="links"
                onClick={() => {
                    dispatch(toggleWindow("profile"));
                }}
            >
                <span className="underline">your</span> profile
            </p>
            <Link to="/friends" className="links">
                <span className="underline">friend</span>ships
            </Link>
            <p
                className="links"
                onClick={() => {
                    dispatch(toggleWindow("find"));
                }}
            >
                <span className="underline">find</span> friends
            </p>
            <p
                className="links"
                onClick={() => {
                    dispatch(toggleWindow("chat"));
                }}
            >
                <span className="underline">global</span> chat
            </p>
        </div>
    );

    const selectBox = (
        <ul id="bmac_select">
            <li>connect four</li>
            <li>mine-sweeper</li>
            <li>snake</li>
            <li>tetris</li>
            <li>asteroids</li>
            <li>galaga</li>
        </ul>
    );

    return (
        <header>
            {props.userId && (
                <Link to="/">
                    <img src="/svgs/minichat.svg" alt="logo" id="logo" />
                </Link>
            )}
            {!props.userId && (
                <img src="/svgs/minichat.svg" alt="logo" id="logo" />
            )}
            {props.userId && logInHeader}
            {props.userId && (
                <a href="/logout" className="links" id="log_out">
                    <span className="underline">log</span> out
                </a>
            )}
            <span id="date_time">{time}</span>
            <img
                src="/svgs/qmark.svg"
                alt="q bubble"
                id="q_mark"
                onClick={() => {
                    dispatch(toggleWindow("info"));
                }}
            />
            {props.userId && (
                <img
                    src="/svgs/bmac.svg"
                    alt="bmac"
                    id="bmac"
                    onClick={() => setShowSelect(!showSelect)}
                />
            )}
            {showSelect && selectBox}
        </header>
    );
}
