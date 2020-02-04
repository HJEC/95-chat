import React from "react";
import Bio from "./bio";

export default function Profile({ first, last, profilePic, bio, setBio }) {
    return (
        <div className="profileEditor">
            {profilePic}
            <div className="profileInfo">
                <p>{`${first} ${last}`}</p>
                <Bio bio={bio} setBio={setBio} />
            </div>
        </div>
    );
}
