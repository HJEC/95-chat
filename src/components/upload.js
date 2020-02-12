import React from "react";
import Window from "./window";
import { useDispatch } from "react-redux";
import { setImage, toggleUploader } from "../actions";

export default function Uploader() {
    const dispatch = useDispatch();
    async function upload(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        dispatch(setImage(formData));
        dispatch(toggleUploader());
    }

    const uploaderComponent = (
        <div className="imageUploader">
            <h1 className="upload_title">change your profile image</h1>
            <input
                name="image"
                type="file"
                accept="image/*"
                onChange={e => upload(e)}
            />
        </div>
    );
    return (
        <Window
            compToRender={uploaderComponent}
            title="UPLOAD IMAGE"
            default={{ x: 300, y: 200, width: 500, height: 300 }}
            windowName="upload"
        />
    );
}
