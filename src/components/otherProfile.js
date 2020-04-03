import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UseFriendRequest from "./friendRequest";
import Window from "./window";

export default function OtherProfile({ setIndex, classThing, userId }) {
    let friend = useSelector(state => state.sel_user["data"]);

    useEffect(() => {
        (async () => {
            if (friend.id == userId || friend.id == null) {
                location.history.push("/");
            }
        })();
    }, [friend]);

    const otherProfileComponent = (
        <div className="profileEditor">
            <div className="pic_wrapper">
                <div className="otherProfileImg_Request">
                    <img
                        className="otherImage"
                        src={friend.image || "/default.jpg"}
                    />
                    <UseFriendRequest recipient={friend.id} userId={userId} />
                </div>
                <div className="profile_info">
                    <p className="profile_name">
                        {friend.first} {friend.last}
                    </p>
                    <p>{friend.bio || "No bio yet"}</p>
                </div>
            </div>
        </div>
    );

    if (friend) {
        return (
            <Window
                compToRender={otherProfileComponent}
                title={friend.first}
                default={{ x: 125, y: 320, width: 650, height: 475 }}
                windowName="selected"
                setIndex={setIndex}
                classThing={classThing}
            />
        );
    } else {
        return <img src="/loading.gif" className="loading_gif" />;
    }
}
