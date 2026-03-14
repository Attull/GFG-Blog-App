

const Blog = require("../model/blogModel");

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
}

async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
}

async function addBlog(req, res) {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
}

async function updateBlog(req, res) {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
}

async function getBlogByUserId(req, res) {
  try {
    const blogs = await Blog.find({ author: req.params.userid }).populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs by user", error: error.message });
  }
}

module.exports = {
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
  addBlog,
  getBlogByUserId
}
