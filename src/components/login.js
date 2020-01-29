import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    logIn() {
        axios
            .post("/loginUser", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("login: ", data);
                if (data.id) {
                    //it worked
                    location.replace("/");
                } else {
                    //failure
                    this.setState({ error: true });
                }
            });
    }
    render() {
        return (
            <div className="form">
                {this.state.error && (
                    <div className="error">
                        Something went wrong. Please try again.
                    </div>
                )}
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
                <button onClick={() => this.logIn()}>log-in</button>
                <Link to="/">back to register</Link>
                <Link to="/reset">reset your password</Link>
            </div>
        );
    }
}
