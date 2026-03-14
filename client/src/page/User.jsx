import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../component/BlogCard';
import './User.css';
import './User.css';

function User() {
  const [userBlogs, setUserBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserBlogs();
  }, [user, navigate]);

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/blog/user/${user.id}`);
      setUserBlogs(response.data);
    } catch (err) {
      console.error('Error fetching user blogs:', err);
    }
  };

  const handleEdit = (blog) => {
    // For simplicity, navigate to home and edit there
    navigate('/', { state: { editingBlog: blog } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:3000/blog/${id}`);
        fetchUserBlogs();
      } catch (err) {
        console.error('Error deleting blog:', err);
      }
    }
  };

  if (!user) return null;

  return (
    <div className="user-page">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <h2>Your Blogs</h2>
      <div className="blogs-list">
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>You haven't created any blogs yet.</p>
        )}
      </div>
    </div>
  );
}

export default User;