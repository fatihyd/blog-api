const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Blog = require("../models/Blog");
const User = require("../models/User");

router.get("/", async (req, res) => {
  // Populate the author field in the result
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });

  res.json(blogs);
});

router.post("/", authMiddleware, async (req, res) => {
  // Get the user from the authentication middleware
  const user = req.user;

  // Create a new blog
  const blog = new Blog({
    title: req.body.title,
    author: user,
    url: req.body.url,
  });

  const savedBlog = await blog.save();

  // Add the blog to the user's blogs array
  user.blogs.push(savedBlog._id);
  await user.save();

  // Populate the author field in the result
  const populatedBlog = await Blog.findById(savedBlog._id).populate("author", {
    username: 1,
    name: 1,
  });

  // Return the populated blog upon success
  res.status(201).json(populatedBlog);
});

router.put("/:id", authMiddleware, async (req, res) => {
  // Check if the token sent with the request is the same as that of the blog's author
  const blog = await Blog.findById(req.params.id);

  if (req.user.id !== blog.author._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this blog!" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedBlog);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  // Check if the token sent with the request is the same as that of the blog's author
  const blog = await Blog.findById(req.params.id);

  if (req.user.id !== blog.author._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this blog!" });
  }

  // Delete the blog from the Blog collection
  await Blog.findByIdAndDelete(req.params.id);

  // Remove the blog ID from the user's blogs array
  await User.findByIdAndUpdate(blog.author._id, {
    $pull: { blogs: req.params.id },
  });

  res.status(200).json({ message: "Blog deleted successfully" });
});

module.exports = router;
