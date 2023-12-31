import React, { useState } from 'react';
import Axios from 'axios';

export default function Login() {
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");

    //Send login input and password back to backend
    function handleSubmit(e) {
        e.preventDefault()

        Axios.post('http://localhost:3000/login', {
            loginInput: loginInput,
            password: password,
        })
            .then((res) => {
                console.log('Successfully logged in!');
                window.location = `/${res.data.role}/${res.data.userID}`;
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-outline mb-4">
                    <label>Email address or Phone number:</label><br></br>
                    <input type="text"
                        className="loginInput"
                        onChange={(e) => { setLoginInput(e.target.value) }}
                    />

                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                    <label>Password:</label><br></br>
                    <input type="password"
                        className="password"
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                {/* 2 column grid layout for inline styling */}

                <div>
                    <p>Not a member? <a href="/register">Register</a></p>
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
        </div>
    );
}
