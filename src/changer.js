import React from "react";

export default function Changer(props) {
    return <input onChange={e => props.change(e.target.value)} />;
}
