import React from "react";
import axios from "../axios"; // this component imports axios from the bundle.js.

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setFile(e) {
        this.file = e.target.files[0];
        console.log("NEW FILE: ", this.file);
    }

    upload(e) {
        e.preventDefault();

        var formData = new FormData();
        // We need to use formData to send a file to the server
        formData.append("file", this.file);

        axios
            .post("/upload", formData)
            .then(response => {
                console.log("response from POST /upload: ", response);
                this.props.setImageUrl(response.data);
            })
            .catch(function(err) {
                console.log("CLIENT UPLOAD ERROR:", err);
            });
    }
    render() {
        return (
            <div>
                <h1>change your profile image</h1>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={e => this.setFile(e)}
                />
                <button onClick={e => this.upload(e)}>UPLOAD</button>
            </div>
        );
    }
}
// onClick={setImageUrl}
