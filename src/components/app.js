// REACT //
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { setUserId, setBio } from "../actions";
// COMPONENTS //
import Chat from "./globalChat";
import Find from "./find";
import Friends from "./friends";
import HeaderBar from "./headerBar";
import Info from "./info";
import Intro from "./introscreen";
import OtherProfile from "./otherProfile";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./upload";
import UserImage from "./userImage";

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const introViz = useSelector(state => state.introViz);
    // state conditionals to open relevant modal windows
    const showChat = useSelector(state => state.showChat);
    const showFinder = useSelector(state => state.showFinder);
    const showInfo = useSelector(state => state.showInfo);
    const showProfile = useSelector(state => state.showProfile);
    const showUpload = useSelector(state => state.showUpload);
    const [topWindow, setTopWindow] = useState();

    useEffect(() => {
        dispatch(setUserId());
    }, []);

    const detectWindow = e => {
        setTopWindow(e);
    };
    if (!user) {
        return null;
    }
    return (
        <BrowserRouter>
            <div className="crt_black">
                <div className="crt_window" />
            </div>
            {!introViz && <Intro />}
            {user.length == 0 && (
                <img src="/loading.gif" alt="loading.." className="loading" />
            )}
            <div>
                <HeaderBar userId={user.id} />
                <UserImage user={user} />

                <Route
                    path="/user/:id"
                    render={props => (
                        <OtherProfile
                            userId={user.id}
                            history={props.history}
                            match={props.match}
                        />
                    )}
                />
                <Route
                    path="/friends"
                    render={() => <Friends userId={user.id} />}
                />
            </div>

            {showProfile && (
                <Profile
                    first={user.first}
                    last={user.last}
                    bio={user.bio}
                    setBio={bio => {
                        dispatch(setBio(bio));
                    }}
                    setIndex={e => detectWindow(e)}
                    classThing={
                        topWindow == "profile"
                            ? "window_outer front"
                            : "window_outer"
                    }
                    profilePic={
                        <ProfilePic
                            className="profileImage"
                            id={user.userId}
                            first={user.first}
                            last={user.last}
                            image={user.image}
                        />
                    }
                />
            )}
            {showChat && (
                <Chat
                    setIndex={e => detectWindow(e)}
                    classThing={
                        topWindow == "chat"
                            ? "window_outer front"
                            : "window_outer"
                    }
                />
            )}
            {showFinder && (
                <Find
                    setIndex={e => detectWindow(e)}
                    classThing={
                        topWindow == "find"
                            ? "window_outer front"
                            : "window_outer"
                    }
                />
            )}
            {showInfo && (
                <Info
                    setIndex={e => detectWindow(e)}
                    classThing={
                        topWindow == "info"
                            ? "window_outer front"
                            : "window_outer"
                    }
                />
            )}
            {showUpload && (
                <Uploader
                    setIndex={e => detectWindow(e)}
                    classThing={
                        topWindow == "upload"
                            ? "window_outer front"
                            : "window_outer"
                    }
                />
            )}
        </BrowserRouter>
    );
}
