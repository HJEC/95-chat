import React from "react";

export default class bioEditor extends React.Component {
    Constructor(props) {
        super(props);
        this.state = {
            edited: false,
            bio: this.props.bio
        };
    }
    addBio() {
        return (
            <div>
                <button onClick={() => this.toggleState}>
                    Edit your Profile
                </button>
            </div>
        );
    }
    showBio() {
        return (
            <div>
                <p>{this.state.bio}</p>
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

    render() {
        return (
            <div>
                {this.state.edited
                    ? this.showBio
                    : this.state.bio
                    ? this.showBio
                    : this.addBio}
            </div>
        );
    }
}
