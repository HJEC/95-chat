// REACT //
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { setUserId, setBio, toggleUploader } from "../actions";
// COMPONENTS //
import Chat from "./globalChat";
import Find from "./find";
import Friends from "./friends";
import HeaderBar from "./headerBar";
import Info from "./info";
import OtherProfile from "./otherProfile";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./upload";

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    // state conditionals to open relevant modal windows
    const showChat = useSelector(state => state.showChat);
    const showInfo = useSelector(state => state.showInfo);
    const showProfile = useSelector(state => state.showProfile);
    const showUpload = useSelector(state => state.showUpload);

    useEffect(() => {
        dispatch(setUserId());
    }, []);

    if (!user) {
        return null;
    }
    return (
        <BrowserRouter>
            <div className="crt_black">
                <div className="crt_window" />
            </div>
            {user.length == 0 && (
                <img src="/loading.gif" alt="loading.." className="loading" />
            )}
            <div>
                <HeaderBar userId={user.id} />
                <ProfilePic
                    className="userImage"
                    toggleUploader={() => dispatch(toggleUploader())}
                    image={user.image}
                    first={user.first}
                    last={user.last}
                />

                <Route
                    path="/user/:id"
                    render={props => (
                        <OtherProfile
                            userId={user.userId}
                            history={props.history}
                            match={props.match}
                        />
                    )}
                />

                <Route path="/find" component={Find} />

                <Route
                    path="/friends"
                    render={() => <Friends userId={user.userId} />}
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
                    profilePic={
                        <ProfilePic
                            className="profileImage"
                            id={user.userId}
                            first={user.first}
                            last={user.last}
                            image={user.image}
                            toggleUploader={() => dispatch(toggleUploader())}
                        />
                    }
                />
            )}
            {showChat && <Chat />}
            {showInfo && <Info />}
            {showUpload && <Uploader />}
        </BrowserRouter>
    );
}

// <Route
//     exact
//     path="/"
//     render={() => (
//         <Profile
//             first={user.first}
//             last={user.last}
//             bio={user.bio}
//             setBio={bio => {
//                 dispatch(setBio(bio));
//             }}
//             profilePic={
//                 <ProfilePic
//                     className="profileImage"
//                     id={user.userId}
//                     first={user.first}
//                     last={user.last}
//                     image={user.image}
//                     toggleUploader={() =>
//                         dispatch(toggleUploader())
//                     }
//                 />
//             }
//         />
//     )}
// />
