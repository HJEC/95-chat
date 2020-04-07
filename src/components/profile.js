import React, { useState } from "react";
import Bio from "./bio";
import Window from "./window";

export default function Profile({
    first,
    last,
    profilePic,
    bio,
    setBio,
    setIndex,
    classThing
}) {
    const [checkedState, setCheckedState] = useState("unchecked");
    const deleteAccount = () => {
        let result = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (result == true) {
            window.alert(
                "Your account has been deleted. You will now be redirected to the registration page."
            );
            setTimeout(() => {
                location.replace("/");
            }, 1000);
        } else {
            setCheckedState(false);
            return;
        }
    };
    const profileComponent = (
        <div className="profileEditor">
            <div className="pic_wrapper">
                <form className="profile_form" onChange={() => deleteAccount()}>
                    {profilePic}
                    <p>
                        Click to delete account:
                        <span>
                            <input
                                type="checkbox"
                                name="delete_checkbox"
                                defaultValue={checkedState}
                            />
                        </span>
                    </p>
                </form>
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
            default={{ x: 20, y: 220, width: 650, height: 375 }}
            windowName="profile"
            setIndex={setIndex}
            classThing={classThing}
        />
    );
}
