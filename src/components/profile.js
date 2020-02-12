import React from "react";
import Bio from "./bio";
import Window from "./window";

export default function Profile({ first, last, profilePic, bio, setBio }) {
    const profileComponent = (
        <div className="profileEditor">
            {profilePic}
            <div className="profileInfo">
                <p>{`${first} ${last}`}</p>
                <Bio bio={bio} setBio={setBio} />
            </div>
        </div>
    );

    return (
        <Window
            compToRender={profileComponent}
            title="YOUR PROFILE"
            default={{ x: 300, y: 200, width: 550, height: 450 }}
            windowName="profile"
        />
    );
}
