import React from "react";

export default function ProfilePic(props) {
    return (
        <div className={props.className}>
            <img
                src={props.image}
                alt={`${props.first} ${props.last}`}
                onClick={props.toggleUploader}
            />
        </div>
    );
}
