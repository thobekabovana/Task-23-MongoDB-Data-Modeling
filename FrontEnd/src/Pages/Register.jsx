import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");  // State to handle error
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the registration request
      await axios.post("http://localhost:5000/api/users/register", formData);
  
      // Show success alert and navigate to login page
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response) {
        // If the error is from the server, check the response status and message
        if (err.response.status === 400) {
          alert(err.response.data.message);  // This will show "User already exists"
        } else {
          alert("An error occurred. Please try again.");
        }
      } else {
        // Network or other issues
        alert("Network error. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Click here</Link> to login.
      </p>
    </div>
  );
}

export default Register;
