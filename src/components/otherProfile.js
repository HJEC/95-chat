import React from "react";
import axios from "../axios";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // console.log("this.props.match: ", this.props.match.params.id);
        let otherID = this.props.match.params.id;
        let { data } = await axios.get(`/api/user/${otherID}`);
        this.setState(data);
        console.log("returned data: ", data);

        if (
            this.props.match.params.id == this.state.userID ||
            this.props.match.params.id == null
        ) {
            //now we redirect back to profilePic
            this.props.history.push("/");
        }
    }

    render() {
        console.log("state:", this.state);
        return (
            <div>
                <h1>long time no see cowboy</h1>
                <p>
                    {this.state.first} {this.state.last}
                </p>
                <img src={this.state.image || "/default.jpg"} />
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
