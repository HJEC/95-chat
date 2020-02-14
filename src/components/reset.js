import React from "react";
import axios from "../axios";

export default class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkEmail() {
        axios
            .post("/recover", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        step: 2
                    });
                } else {
                    this.setState({ error: true });
                }
            });
    }

    resetPassword() {
        axios
            .post("/reset", {
                email: this.state.email,
                code: this.state.code,
                newPassword: this.state.newPassword
            })
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        step: 3
                    });
                } else {
                    this.setState({ error: true });
                }
            });
    }

    resetScreen(step) {
        if (step == 1) {
            return (
                // RESET PASSWORD SCREEN
                <div className="form">
                    <h2>Please enter your account email</h2>
                    <input
                        name="email"
                        placeholder="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.checkEmail()}>
                        reset password
                    </button>
                    <a href="/register">go back to register</a>
                </div>
            );
        } else if (step == 2) {
            return (
                // ENTER NEW PASSWORD SCREEN
                <div className="form">
                    <h2>Please enter your recovery code</h2>
                    <input
                        name="code"
                        placeholder="code"
                        onChange={e => this.handleChange(e)}
                        key={this.state.step}
                    />
                    <h2>Please enter your new password</h2>
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="enter new password"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.resetPassword()}>
                        reset password
                    </button>
                    <a href="/login">go back to register</a>
                </div>
            );
        } else if (step == 3) {
            return (
                // SUCCESS SCREEN
                <div className="form">
                    <h1>Success!</h1>
                    <p>
                        You can now{" "}
                        <span>
                            <a href="/login">log in</a>
                        </span>{" "}
                        with your new password
                    </p>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="reset">
                {this.state.error && (
                    <div className="error">
                        Something went wrong. Please try again.
                    </div>
                )}
                <h1>Reset Password</h1>
                {this.resetScreen(this.state.step)}
            </div>
        );
    }
}
