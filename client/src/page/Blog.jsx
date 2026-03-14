import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../component/BlogCard';
import BlogForm from '../component/BlogForm';
import './Blog.css';
import './Blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  useEffect(() => {
    fetchBlogs();
    if (location.state?.editingBlog) {
      setEditingBlog(location.state.editingBlog);
      setShowForm(true);
    }
  }, [location.state]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blog');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:3000/blog/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog:', err);
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  return (
    <div className="blog-page">
      <h1>Blogs</h1>
      {user && !showForm && (
        <button onClick={handleCreate} className="create-btn">Create New Blog</button>
      )}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <div className="blogs-list">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;