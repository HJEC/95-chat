import React from "react";
import axios from "../axios"; // this component imports axios from the bundle.js.

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null };
    }
    setFile(e) {
        this.setState({ file: e.target.files[0] });
        console.log("NEW FILE: ", this.state.file);
    }

    formSubmit(e) {
        e.preventDefault();
        this.upload(this.state.file)
            .then(() => {
                this.setState.updated = true;
                console.log("FORM SUBMITTED!");
            })
            .catch(err => {
                console.log("form failed", err);
            });
    }

    upload(file) {
        console.log("value of file: ", file);
        var formData = new FormData();
        // We need to use formData to send a file to the server
        formData.append("file", file);

        axios
            .post("/upload", formData)
            .then(({ response }) => {
                console.log("response from POST /upload: ", response);
                if (response.success) {
                    this.setState.imageurl = response.image;
                }
            })
            .catch(function(err) {
                console.log("CLIENT UPLOAD ERROR:", err);
            });
    }
    render() {
        return (
            <form onSubmit={e => this.formSubmit(e)}>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={e => this.setFile(e)}
                />
                <button type="submit">UPLOAD</button>
            </form>
        );
    }
}
