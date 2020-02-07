import React from "react";
import axios from "./../axios";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./upload";
import Find from "./find";
import Friends from "./friends";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route, Link } from "react-router-dom";

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
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    push() {
        history.replaceState({}, "", "/");
    }

    render() {
        if (!this.state.id) {
            return (
                <img src="loading.gif" alt="loading.." className="loading" />
            );
        }
        return (
            <BrowserRouter>
                <div>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImageUrl={image => this.setState({ image })}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                    <header>
                        <div className="logo">
                            <img src="/networklogo.svg" alt="logo" />
                        </div>
                        <Link to="/find">find friends</Link>
                        <Link to="/friends">Friendships</Link>
                        <ProfilePic
                            className="userImage"
                            toggleUploader={() => {
                                this.toggleUploader();
                            }}
                            image={this.state.image}
                            first={this.state.first}
                            last={this.state.last}
                        />
                    </header>
                    <Route
                        exact
                        path="/"
                        render={() => (
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
                                        toggleUploader={() =>
                                            this.toggleUploader()
                                        }
                                    />
                                }
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile
                                userId={this.state.id}
                                history={props.history}
                                match={props.match}
                            />
                        )}
                    />
                    <Route path="/find" component={Find} />
                    <Route
                        path="/friends"
                        render={() => <Friends userId={this.state.id} />}
                    />
                    <a href="/logout">log out</a>
                </div>
            </BrowserRouter>
        );
    }
}

// <Route path="/friends" component={Friends} />;
