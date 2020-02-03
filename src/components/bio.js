import React from "react";
import axios from "../axios";

export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edited: false,
            bio: this.props.bio
        };
    }
    addBio() {
        return (
            <div>
                <button onClick={() => this.toggleState()}>
                    Edit your Profile
                </button>
            </div>
        );
    }
    changeBio() {
        return (
            <div>
                <p>{this.props.bio}</p>
                <textarea onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>submit new bio</button>
            </div>
        );
    }
    showBio() {
        return (
            <div className="showbio">
                <p>{this.props.bio}</p>
                <button onClick={() => this.toggleState()}>
                    change your bio
                </button>
            </div>
        );
    }

    toggleState() {
        this.setState({
            edited: !this.state.edited
        });
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    async submit() {
        try {
            await axios.post("/change-bio", { bio: this.state.bio });
            this.props.setBio(this.state.bio);
            this.toggleState();
        } catch (err) {
            console.log("Error in bio submit - line 67: ", err);
        }
    }

    render() {
        return (
            <div>
                {this.state.edited
                    ? this.changeBio()
                    : this.state.bio
                    ? this.showBio()
                    : this.addBio()}
            </div>
        );
    }
}
