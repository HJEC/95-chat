import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function Window() {
    const dispatch = useDispatch();
    const [sizes, setSizes] = useState();

    function enlarge() {
        console.log("clicked!");
        setSizes({ width: "90vw", height: "90vh" });
    }

    return (
        <Rnd
            size={sizes || ""}
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
                <span className="modal_name handle">COMPONENT</span>
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
// <ResizableBox
//     className="window_outer"
//     handle={<span className="window_resizer" />}
//     draggableOpts={{ grid: [25, 25] }}
//     width={200}
//     height={200}
// >
//     <Draggable
//         handle=".handle"
//         defaultPosition={{ x: 300, y: 100 }}
//         position={null}
//         grid={[25, 25]}
//         scale={1}
// >
