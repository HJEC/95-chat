import React, { useEffect, useRef } from "react";
import { socket } from "../socket.js";
import { useSelector } from "react-redux";
import Window from "./window";

export default function Chat(props) {
    let chatMessages = useSelector(state => state && state.chatMessages);
    let user = useSelector(state => state.user.id);

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
    const chatComponent = (
        <div className="chat">
            <div className="chat_container" ref={elemRef}>
                {chatMessages.length > 0 &&
                    chatMessages.map((i, idx) => {
                        return (
                            <div
                                className={
                                    i.sender_id == user
                                        ? "message_block_right"
                                        : "message_block_left"
                                }
                                key={idx}
                            >
                                <a href={`user/${i.sender_id}`}>
                                    <img
                                        src={i.image || "/default.png"}
                                        className={
                                            i.sender_id == user
                                                ? "chat_image chat_right"
                                                : "chat_image chat_left"
                                        }
                                    />
                                    <p className="chat_name">
                                        {i.first} {i.last}
                                    </p>
                                </a>
                                <p
                                    className={
                                        i.sender_id == user
                                            ? "chat_message chat_right"
                                            : "chat_message chat_left"
                                    }
                                >
                                    {i.message}
                                </p>
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
    return (
        <Window
            compToRender={chatComponent}
            title="'95 CHAT"
            default={{ x: 785, y: 50, width: 550, height: 450 }}
            windowName="chat"
            setIndex={props.setIndex}
        />
    );
}
