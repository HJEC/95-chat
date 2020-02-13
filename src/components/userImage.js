import React from "react";
import ProfilePic from "./profilePic";
import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function UserImage(props) {
    const user = props.user;
    const dispatch = useDispatch();
    return (
        <div className="floating_image">
            <ProfilePic
                className="userImage"
                image={user.image}
                first={user.first}
                last={user.last}
            />
            <p
                className="userImage_subtext"
                onClick={() => {
                    dispatch(toggleWindow("upload"));
                }}
            >
                CHANGE IMAGE
            </p>
        </div>
    );
}
