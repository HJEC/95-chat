import React, { useState } from "react";

export default function FriendRequest() {
    const [status, setStatus] = useState("send friend request");

    return (
        <div>
            <button onClick={submit}>{status}</button>
        </div>
    );
}
