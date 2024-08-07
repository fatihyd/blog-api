import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(res.data);
    }

    useEffect(() => {
        fetchBlogs();
    } , []);

    const updateBlog = async (blog) => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
        }

        const token = JSON.parse(window.localStorage.getItem('loggedInUser')).token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        await axios.put(`http://localhost:3000/api/blogs/${blog._id}`, updatedBlog, config);
        setBlogs((prevBlogs) => 
            prevBlogs.map(b => b._id === blog._id ? { ...b, likes: blog.likes } : b)
        );
    }

    return (
        <>
            <BlogForm fetchBlogs={fetchBlogs} />
            <BlogList blogs={blogs} updateBlog={updateBlog}/>
        </>
    );
};

export default Blogs;