//src/actions.js
import axios from "./axios";

export async function setUserId() {
    const { data } = await axios.get("/user");
    return {
        type: "SET_USER_ID",
        user: {
            id: data.id,
            first: data.first,
            last: data.last,
            image: data.image,
            bio: data.bio
        }
    };
}

export function toggleUploader() {
    return {
        type: "TOGGLE_UPLOADER"
    };
}

export async function setImage(formData) {
    const { data } = await axios.post("/upload", formData);
    return {
        type: "SET_IMAGE",
        image: data
    };
}

export function setBio(bio) {
    return {
        type: "SET_BIO",
        bio: bio
    };
}

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

export function toggleWindow() {
    return {
        type: "WINDOW_VISIBILITY"
    };
}
