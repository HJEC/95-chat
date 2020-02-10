import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function Window() {
    const dispatch = useDispatch();
    const [windowSize, setWindowSize] = useState();

    useEffect(() => {
        setWindowSize({ x: 300, y: 200, width: 500, height: 300 });
        console.log("window:", windowSize);
    }, []);
    function enlarge() {
        console.log("clicked!");
        setWindowSize({ x: 20, y: 20, width: 800, height: 800 });
    }

    return (
        <Rnd
            style={{
                cursor: "arrow"
            }}
            default={windowSize || { x: 300, y: 200, width: 500, height: 300 }}
            minWidth="400"
            minHeight="250"
            className="window_outer"
            resizeGrid={[25, 25]}
            dragHandleClassName="handle"
            resizeHandleWrapperClass="window_resizer"
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
                <span className="spacer handle">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <span className="modal_name handle">COMPONENT</span>
                <span className="spacer handle">
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
