import React, { useState } from "react";
import axios from "../../axios";

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);

    const submit = () => {
        console.log("values:", values);
        axios
            .post(url, values)
            .then(({ data }) => {
                if (!data.success) {
                    setError(true);
                } else {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("handleSubmit error: ", err);
            });
    };
    return [submit, error];
}
