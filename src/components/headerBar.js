import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWindow } from "../actions";

export default function HeaderBar(props) {
    const dispatch = useDispatch();
    const [time, setTime] = useState();

    setInterval(() => {
        setTime(new Date().toLocaleString());
    }, 1000);

    const logInHeader = (
        <div id="links_container">
            <Link to="/" className="links">
                <span className="underline">your</span> profile
            </Link>
            <Link to="/find" className="links">
                <span className="underline">find</span> friends
            </Link>
            <Link to="/friends" className="links">
                <span className="underline">friend</span>ships
            </Link>
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

    return (
        <header>
            <img src="/svgs/minichat.svg" alt="logo" id="logo" />
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
                    dispatch(toggleWindow());
                }}
            />
            <img src="/svgs/bmac.svg" alt="bmac" id="bmac" />
        </header>
    );
}
