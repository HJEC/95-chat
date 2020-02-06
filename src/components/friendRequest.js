import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function UseFriendRequest({ recipient, userId }) {
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();
    const [friendState, setFriendState] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/is-friend/${recipient}`);
            console.log("is-friend data:", data);
            if (!data) {
                setStatus("send friend request");
                setUrl("/request-friendship");
            } else if (!data.accepted) {
                if (data.sender_id == userId) {
                    setStatus("cancel friend request");
                    setUrl("/cancel-friendship");
                } else {
                    setStatus("accept friend request");
                    setUrl("/accept-friendship");
                }
            } else if (data.accepted) {
                setStatus("end friendship");
                setUrl("/cancel-friendship");
            }
        })();
    }, [friendState]);

    async function submit() {
        const data = await axios.post(`${url}/${recipient}`);
        console.log("post friend data: ", data.data);
        setFriendState(data.data.friendState);
    }

    return <button onClick={submit}>{status}</button>;
}
