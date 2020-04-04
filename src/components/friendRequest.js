import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequestState } from "../actions";
import axios from "../axios";

export default function UseFriendRequest({ recipient, userId }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();
    const requestState = useSelector(state => state.requestState);
    // const [friendState, setFriendState] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/is-friend/${recipient}`);
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
    }, [requestState, recipient]);

    async function submit() {
        const { data } = await axios.post(`${url}/${recipient}`);
        dispatch(setRequestState(data.requestState));
    }

    return (
        <button onClick={submit} className="request_button">
            {status}
        </button>
    );
}
