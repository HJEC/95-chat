import React from "react";
import axios from "./../axios";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./upload";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
        console.log("state data: ", data);
    }
    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
        console.log("state: ", this.state);
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
                <div>
                    <div className="logo">
                        <img src="networklogo.svg" alt="logo" />
                    </div>
                    <ProfilePic
                        className="userImage"
                        toggleUploader={() => {
                            this.toggleUploader();
                        }}
                        image={this.state.image}
                        first={this.state.first}
                        last={this.state.last}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImageUrl={image => this.setState({ image })}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    bio={this.state.bio}
                    setBio={bio => this.setState({ bio })}
                    profilePic={
                        <ProfilePic
                            className="profileImage"
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            image={this.state.image}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    }
                />
            </div>
        );
    }
}
