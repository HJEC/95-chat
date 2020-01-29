import React from "react";

export default function Greetee(props) {
    console.log("props", props);
    const greetee = props.name;
    console.log("greetee", greetee);
    const elem = <span className={greetee}>{greetee}</span>;
    return elem;
}
