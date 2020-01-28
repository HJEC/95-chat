import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="welcome">
                <img src="siphon_philter.jpg" />
                <Registration />
            </div>
        );
    }
}
