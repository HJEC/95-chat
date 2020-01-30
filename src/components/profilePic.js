import React from "react";
import axios from "../axios"; // this component imports axios from the bundle.js.

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.name = this.props.first + " " + this.props.last;
    }
    render() {
        return (
            <div>
                <img src={this.props.image} alt={this.name} />
                <h1> you are in profile pic </h1>
            </div>
        );
    }
}
