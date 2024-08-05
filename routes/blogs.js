const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  // Populate the author field in the result
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });

  res.json(blogs);
});

router.post("/", async (req, res) => {
  // Fetch any user from the database (for example, the first one found)
  const user = await User.findOne();

  // Create a new blog
  const blog = new Blog({
    title: req.body.title,
    author: user._id,
    url: req.body.url,
  });

  const savedBlog = await blog.save();

  // Add the blog to the user's blogs array
  user.blogs.concat(savedBlog._id);
  await user.save();

  // Populate the author field in the result
  const populatedBlog = await Blog.findById(savedBlog._id).populate("author", {
    username: 1,
    name: 1,
  });

  // Return the populated blog upon success
  res.status(201).json(populatedBlog);
});

router.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: req.body.likes },
    { new: true }
  );

  res.json(updatedBlog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Blog deleted successfully" });
});

module.exports = router;
