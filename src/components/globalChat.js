import React, { useEffect, useRef } from "react";
import { socket } from "../socket.js";
import { useSelector } from "react-redux";
import Window from "./window";

export default function Chat() {
    let chatMessages = useSelector(state => state && state.chatMessages);
    console.log("chatMessages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        let { clientHeight, scrollHeight } = elemRef.current;
        elemRef.current.scrollTop = scrollHeight - clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.keyCode == "13") {
            e.preventDefault();
            socket.emit("post message", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chat">
            <h1> Chat Room</h1>
            <div className="chat_container" ref={elemRef}>
                {chatMessages.length > 0 &&
                    chatMessages.map((i, idx) => {
                        return (
                            <div className="message_block" key={idx}>
                                <a href={`user/${i.sender_id}`}>
                                    <img
                                        src={i.image || "/default.png"}
                                        className="chat_image"
                                    />
                                    <p className="chat_name">
                                        {i.first} {i.last}
                                    </p>
                                </a>
                                <p className="chat_message">{i.message}</p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                className="chat_textarea"
                placeholder="say something to the chat:"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
