import React from "react";
import axios from "../axios"; // this component imports axios from the bundle.js.

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    upload() {
        var formData = new FormData();
        // We need to use formData to send a file to the server
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("username", this.username);
        formData.append("file", this.file);
        axios
            .post("/upload", formData)
            .then(function(response) {
                console.log("response from POST /upload: ", response);
            })
            .catch(function(err) {
                console.log("Error in POST: ", err);
            });
    }
    render() {
        return (
            <div>
                <input name="image" type="file" accept="image/*" />
                <button onClick={() => this.upload()}>UPLOAD</button>
            </div>
        );
    }
}
