import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsWannabes,
    acceptFriendship,
    endFriendship
} from "../actions";

export default function Friends(props) {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friends && state.friends.filter(friend => friend.accepted)
    );
    const requests = useSelector(
        state =>
            state.friends &&
            state.friends.filter(friend => {
                if (friend.accepted == 0) {
                    if (friend.sender_id != props.userId) return friend;
                }
            })
    );
    const penders = useSelector(
        state =>
            state.friends &&
            state.friends.filter(friend => friend.sender_id == props.userId)
    );

    console.log("friends:", friends);
    console.log("requests:", requests);
    console.log("penders:", penders);
    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);

    if (!friends || !requests || !penders) {
        return null;
    }

    const friendships = (
        <div className="friendships">
            {friends.map(friend => (
                <div className="friend" key={friend.id}>
                    <img src={friend.image} />
                    <div className="end">
                        <button
                            onClick={() => dispatch(endFriendship(friend.id))}
                        >
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
                <div className="friend" key={request.id}>
                    <img src={request.image} />
                    <div className="end">
                        <button
                            onClick={() =>
                                dispatch(acceptFriendship(request.id))
                            }
                        >
                            accept friendship
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const pendingFriends = (
        <div className="pendingFriends">
            {penders.map(penders => (
                <div className="friend" key={penders.id}>
                    <img src={penders.image} />
                    <div className="end">
                        <button
                            onClick={() => dispatch(endFriendship(penders.id))}
                        >
                            cancel friendship
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
                <p>these people would like to be your friend</p>
            )}
            {!!requests.length && requestedFriend}

            {penders.length == 0 && <p>You havent sent any requests</p>}
            {!!penders.length && <p>here are your pending requests</p>}
            {!!penders.length && pendingFriends}
        </div>
    );
}
