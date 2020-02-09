import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setTime } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderBar(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTime());
    });
    const logInHeader = (
        <div id="links_container">
            <Link to="/find" className="links">
                find friends
            </Link>
            <Link to="/friends" className="links">
                Friendships
            </Link>
        </div>
    );

    return (
        <header>
            <img src="/95chat.svg" alt="logo" id="logo" />
            {props.userId && logInHeader}
            <span id="date_time"></span>
        </header>
    );
}
