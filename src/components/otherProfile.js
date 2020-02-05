import React, { useState, useEffect } from "react";
import axios from "../axios";
import FriendRequest from "./friendRequest";

export default function OtherProfile(props) {
    const [friend, setFriend] = useState();
    let otherId = props.match.params.id;
    let key = props.match.url;

    useEffect(() => {
        (async () => {
            let { data } = await axios.get(`/api/user/${otherId}`);
            console.log("found friend: ", data);
            console.log("param: ", otherId);
            console.log("id: ", props.userId);
            setFriend(data);
            if (otherId == props.userId || otherId == null) {
                props.history.push("/");
            }
        })();
    }, [key]);

    if (friend) {
        return (
            <div>
                <h1>long time no see cowboy</h1>
                <p>
                    {friend.first} {friend.last}
                </p>
                <img src={friend.image || "/default.jpg"} />
                <p>{friend.bio}</p>
                <FriendRequest />
            </div>
        );
    } else {
        return <img src="/loading.gif" />;
    }
}
