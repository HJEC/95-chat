import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function UseFriendRequest({ recipient, userId }) {
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();

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
    });

    async function submit() {
        const data = await axios.post(`${url}/${recipient}`);
        console.log("post friend data: ", data);
        if (!data.accepted || data.friendState == "requested") {
            console.log("friendstate: ", data.friendstate);
            setStatus("cancel friend request");
        } else if (data.friendState == "cancelled") {
            console.log("friendstate: ", data.friendstate);
            setStatus("send friend request");
        } else if (data.friendState == "accepted") {
            console.log("friendstate: ", data.friendstate);
            setStatus("end friendship");
        }
    }

    return <button onClick={submit}>{status}</button>;
}
