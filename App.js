import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault()

    Axios.post('http://localhost:3000/register', {
      username: username,
      password: password,
      role: role
    })
  }

  return (
    <div className="App">
      <div className="Register-form">
        <form onSubmit={handleSubmit}>
          <p>User Name</p>

          <input
            className="username"
            type="text"
            onChange={(e) => { setUsername(e.target.value) }}
          />

          <p>Password</p>

          <input
            className="password"
            type="text"
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <p>Role</p>

          <select className="role" onChange={(e) => { setRole(e.target.value) }}>
            <option value="Seller">Seller</option>
            <option value="Customer">Customer</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
