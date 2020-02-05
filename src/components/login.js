import React from "react";
import { Link } from "react-router-dom";
import useAuthSubmit from "./hooks/useAuthSubmit";
import useStatefulFields from "./hooks/useStatefulFields";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/loginUser", values);

    return (
        <div className="form">
            <input name="email" placeholder="email" onChange={handleChange} />
            <input
                name="password"
                placeholder="password"
                type="password"
                onChange={handleChange}
            />
            <button onClick={submit}>log-in</button>
            <br />
            {error && (
                <div className="error">
                    Something went wrong. Please try again.
                </div>
            )}
            <Link to="/">back to register</Link>
            <Link to="/reset">reset your password</Link>
        </div>
    );
}
