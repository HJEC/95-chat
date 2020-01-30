import React from "react";

export default function ProfilePic(props) {
    const name = props.first + " " + props.last;
    const clickHandler = props.clickHandler;

    return (
        <div>
            <img src={props.image} alt={name} onClick={clickHandler} />
            <h1> you are in profile pic </h1>
        </div>
    );
}
