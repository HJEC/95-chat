import React from "react";

export default function ProfilePic(props) {
    return (
        <div>
            <img
                src={props.image}
                alt={`${props.first} ${props.last}`}
                onClick={props.toggleUploader}
                className={props.className}
            />
        </div>
    );
}
