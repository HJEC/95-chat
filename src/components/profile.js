import React from "react";
import Bio from "./bio";
import Window from "./window";

export default function Profile({ first, last, profilePic, bio, setBio }) {
    const profileComponent = (
        <div className="profileEditor">
            <div className="pic_wrapper">
                {profilePic}
                <div className="profile_info">
                    <p className="profile_name">{`${first} ${last}`}</p>
                    <Bio bio={bio} setBio={setBio} />
                </div>
            </div>
        </div>
    );

    return (
        <Window
            compToRender={profileComponent}
            title="YOUR PROFILE"
            default={{ x: 20, y: 520, width: 650, height: 375 }}
            windowName="profile"
        />
    );
}
