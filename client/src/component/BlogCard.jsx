import React from 'react';
import './BlogCard.css';
import './BlogCard.css';

function BlogCard({ blog, onEdit, onDelete }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p className="author">By: {blog.author.name}</p>
      <p className="date">{new Date(blog.createdAt).toLocaleDateString()}</p>
      {user && user.id === blog.author._id && (
        <div className="actions">
          <button onClick={() => onEdit(blog)}>Edit</button>
          <button onClick={() => onDelete(blog._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default BlogCard;