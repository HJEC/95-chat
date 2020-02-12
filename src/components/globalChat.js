import React, { useEffect, useRef } from "react";
import { socket } from "../socket.js";
import { useSelector } from "react-redux";
import Window from "./window";

export default function Chat() {
    let chatMessages = useSelector(state => state && state.chatMessages);
    let user = useSelector(state => state.user.id);

    console.log("chatMessages: ", chatMessages);
    console.log("user: ", user);

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
    return (
        <Window
            compToRender={chatComponent}
            title="'95 CHAT"
            default={{ x: 300, y: 200, width: 550, height: 450 }}
        />
    );
}

// <div className="chat">
//     <h1> Chat Room</h1>
//     <div className="chat_container" ref={elemRef}>
//         {chatMessages.length > 0 &&
//             chatMessages.map((i, idx) => {
//                 return (
//                     <div
//                         className={
//                             i.sender_id == user
//                                 ? "message_block_right"
//                                 : "message_block_left"
//                         }
//                         key={idx}
//                     >
//                         <a href={`user/${i.sender_id}`}>
//                             <img
//                                 src={i.image || "/default.png"}
//                                 className="chat_image"
//                             />
//                             <p className="chat_name">
//                                 {i.first} {i.last}
//                             </p>
//                         </a>
//                         <p className="chat_message">{i.message}</p>
//                     </div>
//                 );
//             })}
//     </div>
//     <textarea
//         className="chat_textarea"
//         placeholder="say something to the chat:"
//         onKeyDown={keyCheck}
//     ></textarea>
// </div>
