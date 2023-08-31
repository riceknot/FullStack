import React, { useState } from 'react';
import Axios from 'axios';

export default function Login() {
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        Axios.post('http://localhost:3000/login', {
            loginInput: loginInput,
            password: password,
        })
            .then((res) => {
                console.log('Successfully logged in!');
                window.location.href = `/${res.data.role}/${res.data.userID}`;
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="container">
            <div className="Login-form">
                <form onSubmit={handleSubmit}>
                    <label>Email or Phone</label>
                    <input
                        className="loginInput"
                        type="text"
                        onChange={(e) => { setLoginInput(e.target.value) }}
                    />

                    <label>Password</label>
                    <input
                        className="password"
                        type="text"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}