import React from "react";
import axios from "./../axios";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./upload";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => this.setState(data));
    }

    render() {
        if (!this.state.id) {
            console.log("no user found:");
            return (
                <img src="loading.gif" alt="loading.." className="loading" />
            );
        }
        return (
            <div>
                <img src="/siphon_philter.jpg" alt="logo" />
                <ProfilePic
                    clickHandler={() =>
                        this.setState({ uploaderIsVisibile: true })
                    }
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                />
                {this.state.uploaderIsVisibile && (
                    <Uploader
                        setImageUrl={image => this.setState({ image })}
                        image={this.state.image}
                    />
                )}
            </div>
        );
    }
}
