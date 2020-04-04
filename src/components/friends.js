import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsWannabes,
    acceptFriendship,
    endFriendship,
    selectedUser
} from "../actions";

export default function Friends(props) {
    const dispatch = useDispatch();
    const friendshipState = useSelector(state => state.friendshipState);
    const requestState = useSelector(state => state.requestState);
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
        console.log("changed!");
        dispatch(getFriendsWannabes());
    }, [friendshipState, requestState]);

    const dragStart = (event, id, image) => {
        event.dataTransfer.setData("id", id);
        console.log("image:", image);
        let img = new Image();
        img.src = image;
        img.classList.add("relationship_image");
        event.dataTransfer.setDragImage(img, -50, -50);
    };
    const onDragOver = event => {
        event.preventDefault();
    };

    const onDrop = event => {
        let end_id = event.dataTransfer.getData("id");
        var audio = new Audio("/delete.mp3");
        audio.play();
        dispatch(endFriendship(end_id));
    };

    if (!friends || !requests || !penders) {
        return null;
    }

    const friendships = (
        <div className="relationships">
            {friends.map(friend => (
                <div className="friend" key={friend.id}>
                    <div
                        onClick={() => dispatch(selectedUser(friend.id))}
                        key={friend.id}
                        draggable="true"
                        onDragStart={event =>
                            dragStart(event, friend.id, friend.image)
                        }
                    >
                        <img
                            src={friend.image}
                            className="relationship_image"
                        />
                        <p>
                            {friend.first} {friend.last}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    const requestedFriend = (
        <div className="relationships">
            {requests.map(request => (
                <div className="request" key={request.id}>
                    <div
                        onClick={() => dispatch(selectedUser(request.id))}
                        key={request.id}
                    >
                        <img
                            src={request.image}
                            className="relationship_image"
                        />
                        <p>
                            {request.first} {request.last}
                        </p>
                    </div>
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
                    <div
                        onClick={() => dispatch(selectedUser(penders.id))}
                        key={penders.id}
                    >
                        <img
                            src={penders.image}
                            className="relationship_image"
                        />
                        <p>
                            {penders.first} {penders.last}
                        </p>
                    </div>
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
                <p className="trashcan_subtext">TRASH</p>
            </div>
        </div>
    );
}
