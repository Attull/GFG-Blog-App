import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogForm.css';
import './BlogForm.css';

function BlogForm({ blog, onSave, onCancel }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (blog) {
      setFormData({ title: blog.title, content: blog.content });
    }
  }, [blog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog) {
        // Update
        await axios.put(`http://localhost:3000/blog/${blog._id}`, formData);
      } else {
        // Create
        await axios.post('http://localhost:3000/blog', { ...formData, author: user.id });
      }
      onSave();
    } catch (err) {
      console.error('Error saving blog:', err);
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h3>{blog ? 'Edit Blog' : 'Create Blog'}</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default BlogForm;