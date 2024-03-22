import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3001/login', { username, password });
        console.log(res.data);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3001/register', { username, password });
        console.log(res.data);
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Login;