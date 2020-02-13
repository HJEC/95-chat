import React from "react";
import Window from "./window";
import { useDispatch } from "react-redux";
import { setImage, toggleWindow } from "../actions";

export default function Uploader(props) {
    const dispatch = useDispatch();
    async function upload(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        dispatch(setImage(formData));
        dispatch(toggleWindow("upload"));
    }

    const uploaderComponent = (
        <div className="imageUploader">
            <h1 className="upload_title">change your profile image</h1>
            <label className="upload_button">
                select new image
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={e => upload(e)}
                    id="file_upload"
                />
            </label>
        </div>
    );
    return (
        <Window
            compToRender={uploaderComponent}
            title="UPLOAD IMAGE"
            default={{ x: 185, y: 220, width: 500, height: 300 }}
            windowName="upload"
            setIndex={props.setIndex}
        />
    );
}
