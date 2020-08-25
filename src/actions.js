//src/actions.js
import axios from "./axios";

// GET / SET USER INFO //
export async function setUserId() {
    const { data } = await axios.get("/user");
    return {
        type: "SET_USER_ID",
        user: {
            id: data.id,
            first: data.first,
            last: data.last,
            email: data.email,
            image: data.image,
            bio: data.bio
        }
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

// FIND FRIEND ACTION

export async function selectedUser(id) {
    let selected_user = await axios.get(`/api/user/${id}`);
    return {
        type: "SELECTED_USER",
        sel_user: selected_user
    };
}

// FRIENDSHIP ACTIONS //

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

export function setRequestState(state) {
    return {
        type: "UPDATE_REQUEST_STATE",
        requestState: state
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

// CHAT ACTIONS //

export function postMessage(message) {
    return {
        type: "POST_MESSAGE",
        message: message
    };
}

export function chatMessages(msgsData) {
    return {
        type: "GET_MESSAGES",
        chatMessages: msgsData
    };
}

// MODAL WINDOW ACTIONS //
export function toggleWindow(name) {
    return {
        type: "WINDOW_VISIBILITY",
        windowName: name
    };
}

// INTRO ANIMATION ACTIONS

export function closeIntro() {
    return {
        type: "HIDE_INTRO"
    };
}
export function checkIntroTime(serverTime) {
    let localStorageTime = localStorage.getItem("intro_closed");
    let diffMins = Math.round(
        (((serverTime - localStorageTime) % 86400000) % 3600000) / 60000
    );
    if (diffMins >= 10) {
        return {
            type: "SHOW_INTRO"
        };
    } else {
        return {
            type: "HIDE_INTRO"
        };
    }
}
