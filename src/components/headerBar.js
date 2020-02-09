import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setTime } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderBar(props) {
    // const dispatch = useDispatch();
    // const time = useSelector(state => state.time);
    const [time, setTime] = useState();

    // useEffect(() => {
    //     setInterval(() => {
    //         dispatch(setTime());
    //     }, 1000);
    // });
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
            <img src="/svgs/qmark.svg" alt="q bubble" id="q_mark" />
            <img src="/svgs/bmac.svg" alt="bmac" id="bmac" />
        </header>
    );
}
