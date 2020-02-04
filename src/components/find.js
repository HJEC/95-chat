import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function Find() {
    const [newUsers, setNewUsers] = useState(true);
    const [find, setFind] = useState("");
    const [reqUsers, setReqUsers] = useState("");

    useEffect(() => {
        async () => {
            const { data } = await axios.get("/find/start");
            setNewUsers(data);
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/search/${find}`);
                setReqUsers(data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [find]);

    const findRequest = ({ target }) => {
        setFind(target.value);
    };

    return (
        <div>
            <h1>search for friends</h1>
            <input
                onChange={findRequest}
                type="text"
                placeholder="search for friends"
            />
            {!find && <p>newbies:</p>}
            {!find &&
                newUsers.map(i => {
                    <div>
                        <img src={i.image} />
                        <p>
                            {i.first} {i.last}
                        </p>
                    </div>;
                })}
            {find && <h2>Search:{find}</h2>}
            {find &&
                reqUsers.map(i => {
                    <div>
                        <img src={i.image} />
                        <p>
                            {i.first} {i.last}
                        </p>
                    </div>;
                })}
        </div>
    );
}
