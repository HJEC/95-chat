import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import { useDispatch } from "react-redux";
import { toggleWindow } from "../actions";

export default function Window(props) {
    const dispatch = useDispatch();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [toggle, setToggle] = useState(false);
    const [zIndex, setZIndex] = useState(false);
    let elemRef = useRef();

    useEffect(() => {
        if (!toggle) {
            setWidth(false);
            setHeight(false);
        }
        if (toggle) {
            setWidth(true);
            setHeight(true);
        }
    }, [toggle]);

    return (
        <Rnd
            ref={elemRef}
            default={props.default}
            minWidth={!width ? 500 : 800}
            minHeight={!height ? 350 : 550}
            className={zIndex ? "window_outer front" : "window_outer back"}
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
            onClick={() => setZIndex(!zIndex)}
        >
            <div className="drag_header">
                <span
                    className="window_close_box"
                    onClick={() => {
                        dispatch(toggleWindow(props.windowName));
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
                <span
                    className="window_larger_box"
                    onClick={() => {
                        setToggle(!toggle);
                    }}
                />
            </div>
            {props.compToRender}
            <span className="window_resizer" />
        </Rnd>
    );
}
