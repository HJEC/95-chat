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
    async function deleteAccount() {
        setCheckedState(true);
        let result = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (result == true) {
            let delete_result = await axios.post("/delete-account");
            console.log("delete result:", delete_result);
            if (delete_result.success) {
                window.alert(
                    "Your account has been deleted. You will now be redirected to the registration page."
                );
                console.log("state:", checkedState);
                setTimeout(() => {
                    location.replace("/");
                }, 1000);
            }
        } else {
            console.log("after", checkedState);
            setCheckedState(false);
        }
    }
    const profileComponent = (
        <div className="profileEditor">
            <div className="pic_wrapper">
                <div className="profile_form">
                    {profilePic}
                    <p>
                        Click to delete account:&nbsp;
                        <input
                            type="checkbox"
                            name="delete_checkbox"
                            onChange={() => deleteAccount()}
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
