import React from "react";
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
    return (
        <div className="imageUploader">
            <h1>change your profile image</h1>
            <input
                name="image"
                type="file"
                accept="image/*"
                onChange={e => upload(e)}
            />
        </div>
    );
}
