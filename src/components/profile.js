import React, { useState } from "react";
import Bio from "./bio";
import Window from "./window";
import axios from "../axios";

export default function Profile({
    first,
    last,
    profilePic,
    bio,
    setBio,
    setIndex,
    classThing
}) {
    const [checkedState, setCheckedState] = useState(false);
    const [disclaimer, setDisclaimer] = useState(false);

    async function deleteAccount() {
        let { data } = await axios.post("/delete-account");
        if (data.success) {
            setDisclaimer(2);
            setTimeout(() => {
                location.replace("/");
            }, 1000);
        } else {
            setCheckedState(false);
            setDisclaimer(false);
        }
    }

    const disclaimerComponent = (
        <div className="disclaimer_wrapper">
            {disclaimer == 1 ? (
                <div>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={() => deleteAccount()}>Yes</button>
                    <button onClick={() => setDisclaimer(false)}>cancel</button>
                </div>
            ) : (
                <p>
                    You are now being redirected back to the registration page
                </p>
            )}
        </div>
    );

    const profileComponent = (
        <div className="profileEditor">
            {disclaimer && disclaimerComponent}
            <div className="pic_wrapper">
                <div className="profile_form">
                    {profilePic}
                    <p>
                        Click to delete account:&nbsp;
                        <input
                            type="checkbox"
                            name="delete_checkbox"
                            onChange={() => setDisclaimer(1)}
                            checked={checkedState}
                        />
                    </p>
                </div>
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
            default={{ x: 20, y: 220, width: 675, height: 475 }}
            windowName="profile"
            setIndex={setIndex}
            classThing={classThing}
        />
    );
}
