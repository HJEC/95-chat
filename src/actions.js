//src/actions.js
import axios from "./axios";

export async function getFriendsWannabes() {
    // axios requests to server
    // ALL action creators will return objects that have a type property
    // all TYPES should be written all-caps with underscores
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "GET_FRIENDS_WANNABES",
        friends: data
    };
}

export async function acceptFriendship(id) {
    await axios.post("/accept-friendship/" + id);
    return {
        type: "ACCEPT_FRIENDSHIP",
        id
    };
}

export async function endFriendship(id) {
    await axios.post("cancel-friendship/" + id);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}
