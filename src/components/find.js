import React, { useState, useEffect } from "react";
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
                    console.log("here");
                    let { data } = await axios.get(`/api/find/${find}`);
                    if (!ignore) {
                        setUsers(data);
                    }
                    console.log("search results: ", users);
                } catch (err) {
                    console.log("error in find users find - 23", err);
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

    return (
        <div>
            <h1>search for friends</h1>
            <input
                onChange={onChange}
                type="text"
                placeholder="search for friends"
            />
            {!find && <p>newbies:</p>}
            {find && <h2>Search:{find}</h2>}
            {users.map((i, idx) => {
                return (
                    <a href={`user/${i.id}`} key={idx}>
                        <div>
                            <img src={i.image} />
                            <p>
                                {i.first} {i.last}
                            </p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
