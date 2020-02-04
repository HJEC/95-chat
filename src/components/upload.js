import React from "react";
import axios from "../axios"; // this component imports axios from the bundle.js.

export default function Uploader({ setImageUrl, toggleUploader }) {
    async function upload(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const { data } = await axios.post("/upload", formData);
            toggleUploader();
            console.log("response from POST /upload: ", data);
            setImageUrl(data);
        } catch (err) {
            console.log("upload image failed: ", err);
        }
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
