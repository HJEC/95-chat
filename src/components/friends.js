import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, makeHot, makeNot } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const users = useSelector(
        state => state.users && state.users.filter(user => user.hot)
    );

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    const friendships = (
        <div className="friendships">
            {friends.map(friend => (
                <div className="friend" key={friend.id}>
                    <img src={friend.image} />
                    <div className="end">
                        <button onClick={() => dispatch(endFriend(friend.id))}>
                            end friendship
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const requestedFriend = (
        <div className="requestedFriends">
            {requests.map(request => (
                <div className="friend" key={friend.id}>
                    <img src={request.image} />
                    <div className="end">
                        <button
                            onClick={() => dispatch(acceptFriend(request.id))}
                        >
                            accept friendship
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="friendship_screen">
            {friends.length == 0 && <p>No current friends</p>}
            {!!friends.length && (
                <p> These people are currently your friends </p>
            )}
            {!!friends.length && friendships}

            {requests.length == 0 && <p>No current friend requests</p>}
            {!!requests.length && (
                <p> These people are currently your friends </p>
            )}
            {!!requests.length && requestedFriend}
        </div>
    );
}
