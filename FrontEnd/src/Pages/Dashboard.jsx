import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve the user ID from localStorage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${userId}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (userId) {
      fetchPosts();
    } else {
      console.log("User ID not found.");
    }
  }, [userId]);

  return (
    <div>
      <h1>Your Dashboard</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <p>{post.content}</p>
            <p>Likes: {post.likes.length}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Dashboard;
