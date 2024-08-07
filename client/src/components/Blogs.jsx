import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Blogs = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(res.data);
    }

    useEffect(() => {
        fetchBlogs();
    } , []);

    return (
        <>
            <h1>Welcome back <em>{user.username}</em>!</h1>
            <BlogForm fetchBlogs={fetchBlogs} />
            <BlogList blogs={blogs} />
        </>
    );
};

export default Blogs;