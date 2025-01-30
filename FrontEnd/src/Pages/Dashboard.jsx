import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/posts/your_user_id");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Your Dashboard</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <p>Likes: {post.likes.length}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
