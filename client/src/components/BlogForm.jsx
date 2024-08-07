import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ fetchBlogs }) => {
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBlog = { title, url };
        const token = JSON.parse(window.localStorage.getItem('loggedInUser')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        await axios.post("http://localhost:3000/api/blogs", newBlog, config);
        
        fetchBlogs();

        setTitle('');
        setURL('');
    }

    return (
        <div>
            <h2>create new blog (✦ ‿ ✦)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title here" />
                </div>
                <div>
                    <input type="text" value={url} onChange={(e) => setURL(e.target.value)} placeholder="URL here" />
                </div>
                <div>
                    <input type="submit" value="create" />
                </div>
            </form>
        </div>
    );
};

export default BlogForm;