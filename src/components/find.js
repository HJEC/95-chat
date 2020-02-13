import React, { useState, useEffect } from "react";
import Window from "./window";
import axios from "../axios";

export default function Find() {
    const [users, setUsers] = useState([]);
    const [find, setFind] = useState("");

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/api/find/start");
            console.log("new users: ", data);
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        let ignore;
        if (find) {
            (async () => {
                try {
                    let { data } = await axios.get(`/api/find/${find}`);
                    if (!ignore) {
                        setUsers(data);
                    }
                    console.log("search results: ", users);
                } catch (err) {
                    console.log("error in find find", err);
                }
            })();
            return () => {
                ignore = true;
            };
        }
    }, [find]);

    const onChange = ({ target }) => {
        console.log("target: ", target.value);
        if (target.value == " ") {
            target.value = target.value.replace(/ +/g, "");
        }
        setFind(target.value);
    };

    const findComponent = (
        <div className="find_container">
            <h1 className="find_title">search for friends</h1>

            {!find && <p className="newbies">newbies:</p>}
            {find && <h2>Search: {find}</h2>}
            <div className="friends_row">
                {users.map((i, idx) => {
                    return (
                        <a
                            href={`user/${i.id}`}
                            key={idx}
                            className="individual_friend_block"
                        >
                            <div>
                                <img
                                    src={i.image || "/default.png"}
                                    className="find_image"
                                />
                                <p>
                                    {i.first} {i.last}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
            <input
                onChange={onChange}
                type="text"
                placeholder="search for friends"
            />
        </div>
    );

    return (
        <Window
            compToRender={findComponent}
            title="FIND FRIENDS"
            default={{ x: 20, y: 50, width: 750, height: 450 }}
            windowName="find"
        />
    );
}
