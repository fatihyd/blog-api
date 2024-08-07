import React from 'react';

const BlogList = ({ blogs, updateBlog }) => {
    return (
        <div>
            <h2>all blogs:</h2>
            <ul>
                {
                    blogs.map((blog) => (
                        <li key={blog._id}>
                            <p><strong>author: </strong>{blog.author.username}</p>
                            <p><strong>title: </strong>{blog.title}</p>
                            <p><strong>likes: </strong>{blog.likes}</p>
                            <button onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })}>like👍</button>
                            <p>{blog.url}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default BlogList;