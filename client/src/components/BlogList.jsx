import React from 'react';

const BlogList = ({ blogs }) => {
    return (
        <div>
            <h2>all blogs:</h2>
            <ul>
                {
                    blogs.map((blog) => (
                        <li key={blog._id}>
                            <p><strong>title: </strong>{blog.title}</p>
                            <p><strong>likes: </strong>{blog.likes}</p>
                            <p>{blog.url}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default BlogList;