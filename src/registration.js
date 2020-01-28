import React from "react";
import axios from "axios"; // this component imports axios from the bundle.js.

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        //this[e.target.name] e.target.value; - setting value in the instance.
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        // axios.post("/register", this.state) - this will post the entire state object.
        console.log("state object: ", this.state);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("submit button data: ", data);
                if (data.id) {
                    //it worked
                    location.replace("/"); // on success, the page will be replaced with the next one
                } else {
                    //failure
                    this.setState({ error: true });
                }
            }); // create error to set this.state.error
    }
    render() {
        return (
            <div className="welcome_form">
                {this.state.error && <div className="error">Oops!</div>}
                <input
                    name="first"
                    placeholder="first"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.submit()}>register</button>
            </div>
        );
    }
}
