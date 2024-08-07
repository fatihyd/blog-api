import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = { username, password };
        const res = await axios.post("http://localhost:3000/api/users/login", credentials);

        window.localStorage.setItem('loggedInUser', JSON.stringify(res.data));
        setUser(res.data);

        setUsername('');
        setPassword('');
    }

    return (
        <div>
            <h1>log in here -_-</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username here" />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password here" />
                </div>
                <div>
                    <input type="submit" value="login" />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;