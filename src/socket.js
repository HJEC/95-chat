import { chatMessages, postMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgData =>
            store.dispatch(chatMessages(msgData))
        );

        socket.on("incoming message", msg => {
            store.dispatch(postMessage(msg));
        });
    }
};
