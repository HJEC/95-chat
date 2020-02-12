import React from "react";
import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";
import { Pixelify } from "react-pixelify";

export default function ProfilePic(props) {
    const dispatch = useDispatch();

    return (
        <div>
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

// <Pixelify
// src={props.image}
// className={props.className}
// alt={`${props.first} ${props.last}`}
// onClick={props.toggleUploader}
// pixelSize={3}
// fillTransparencyColor="rgba(148, 143, 249, 0)"
// />
