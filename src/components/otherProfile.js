import React, { useState, useEffect } from "react";
import axios from "../axios";
import FriendRequest from "./friendRequest";

export default function OtherProfile(props) {
    const [friend, setFriend] = useState();

    useEffect(() => {
        (async () => {
            let otherId = props.params;
            let { data } = await axios.get(`/api/user/${otherId}`);
            console.log("found friend: ", data);
            console.log("param: ", props.params);
            console.log("id: ", props.userId);
            setFriend(data);
            if (props.params == props.userId || props.params == null) {
                props.history.push("/");
            }
        })();
    }, []);

    if (friend) {
        return (
            <div>
                <h1>long time no see cowboy</h1>
                <p>
                    {friend.first} {friend.last}
                </p>
                <img src={friend.image || "/default.jpg"} />
                <p>{friend.bio}</p>
            </div>
        );
    } else {
        return <img src="/loading.gif" />;
    }
}
// <FriendRequest />
