import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Window from "./window";
import axios from "../axios";
import { selectedUser } from "../actions";

export default function Find(props) {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [find, setFind] = useState("");

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/api/find/start");
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
                        <div
                            onClick={() => dispatch(selectedUser(i.id))}
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
                        </div>
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
            setIndex={props.setIndex}
            classThing={props.classThing}
        />
    );
}
