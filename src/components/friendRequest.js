import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function UseFriendRequest({ recipient, userId }) {
    const [status, setStatus] = useState();
    let url;

    useEffect(() => {
        (async () => {
            const data = await axios.get(`/is-friend/${recipient}`);
            console.log("is-friend data:", data);
            if (!data.rows) {
                setStatus("send friend request");
                url = "/request-friendship";
            } else if (!data.rows.accepted) {
                if (data.rows.sender_id == userId) {
                    setStatus("cancel friend request");
                    url = "/cancel-friendship";
                } else {
                    setStatus("accept friend request");
                    url = "/accept-friendship";
                }
            } else if (data.rows.accepted) {
                setStatus("end friendship");
                url = "/cancel-friendship";
            }
        })();
    }, [status]);

    async function submit() {
        const data = axios.post(`${url}/${recipient}`);
        console.log("post friend data: ", data);
        if (data.friendState == "requested") {
            setStatus("cancel friend request");
        } else if (data.friendState == "cancelled") {
            setStatus("send friend request");
        } else if (data.friendState == "accepted") {
            setStatus("end friendship");
        }
    }

    return <button onClick={submit}>{status}</button>;
}
