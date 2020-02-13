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
            state.friends.filter(
                friend =>
                    friend.accepted == 0 && friend.sender_id != props.userId
            )
    );
    const penders = useSelector(
        state =>
            state.friends &&
            state.friends.filter(
                friend =>
                    friend.sender_id == props.userId && friend.accepted == 0
            )
    );

    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, [friends]);

    const dragStart = (event, id) => {
        console.log("dragstart on div: ", id);
        event.dataTransfer.setData("id", id);
    };
    const onDragOver = event => {
        event.preventDefault();
    };

    const onDrop = event => {
        let end_id = event.dataTransfer.getData("id");
        console.log("drop id:", end_id);
        dispatch(endFriendship(end_id));
    };

    if (!friends || !requests || !penders) {
        return null;
    }

    const friendships = (
        <div className="relationships">
            {friends.map(friend => (
                <div className="friend" key={friend.id}>
                    <a
                        href={`/user/${friend.id}`}
                        key={friend.id}
                        draggable="true"
                        onDragStart={event => dragStart(event, friend.id)}
                    >
                        <img src={friend.image} />
                        <p>
                            {friend.first} {friend.last}
                        </p>
                    </a>
                </div>
            ))}
        </div>
    );

    const requestedFriend = (
        <div className="relationships">
            {requests.map(request => (
                <div className="request" key={request.id}>
                    <a href={`/user/${request.id}`} key={request.id}>
                        <img src={request.image} />
                        <p>
                            {request.first} {request.last}
                        </p>
                    </a>
                    <div className="end">
                        <button
                            onClick={() =>
                                dispatch(acceptFriendship(request.id))
                            }
                        >
                            accept request
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const pendingFriends = (
        <div className="relationships">
            {penders.map(penders => (
                <div className="friend" key={penders.id}>
                    <a href={`/user/${penders.id}`} key={penders.id}>
                        <img src={penders.image} />
                        <p>
                            {penders.first} {penders.last}
                        </p>
                    </a>
                    <div className="end">
                        <button
                            onClick={() => dispatch(endFriendship(penders.id))}
                        >
                            cancel request
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
            <div className="floating_can">
                <div
                    className="trashcan"
                    droppable="true"
                    onDragOver={event => onDragOver(event)}
                    onDrop={event => onDrop(event)}
                />
                <p className="trashcan_subtext">delete friend</p>
            </div>
        </div>
    );
}
