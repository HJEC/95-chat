import React from "react";
import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function ProfilePic(props) {
    const dispatch = useDispatch();

    return (
        <div className="profile_photo">
            <img
                src={props.image}
                alt={`${props.first} ${props.last}`}
                onClick={() => {
                    dispatch(toggleWindow("upload"));
                }}
                className={props.className}
            />
        </div>
    );
}
