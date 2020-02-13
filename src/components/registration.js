import React from "react";
import { Link } from "react-router-dom";
import useAuthSubmit from "./hooks/useAuthSubmit";
import useStatefulFields from "./hooks/useStatefulFields";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit("/register", values);

    return (
        <div className="register_form">
            <input name="first" placeholder="first" onChange={handleChange} />
            <input name="last" placeholder="last" onChange={handleChange} />
            <input name="email" placeholder="email" onChange={handleChange} />
            <input
                name="password"
                placeholder="password"
                type="password"
                onChange={handleChange}
            />
            <button onClick={submit}>register</button>

            {error && (
                <div>
                    <br />
                    <div className="error">
                        Invalid registration, try again.
                    </div>
                </div>
            )}
            <Link to="/login">Log in</Link>
        </div>
    );
}
