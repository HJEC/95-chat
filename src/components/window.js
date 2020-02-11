import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function Window(props) {
    const dispatch = useDispatch();
    const [windowSize, setWindowSize] = useState("");

    function enlarge() {
        console.log("clicked!");
        setWindowSize({ "min-width": 600, "min-height": 400 });
    }

    return (
        <Rnd
            style={windowSize}
            default={{ x: 300, y: 200, width: 400, height: 300 }}
            minWidth="400"
            minHeight="250"
            className={"window_outer"}
            resizeGrid={[25, 25]}
            dragHandleClassName="handle"
            enableResizing={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false
            }}
        >
            <div className="drag_header">
                <span
                    className="window_close_box"
                    onClick={() => {
                        dispatch(toggleWindow());
                    }}
                ></span>
                <span className="spacer handle left">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <span className="modal_name handle">{props.title}</span>
                <span className="spacer handle right">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <span className="window_larger_box" onClick={enlarge} />
            </div>
            <span className="window_resizer" />
        </Rnd>
    );
}
