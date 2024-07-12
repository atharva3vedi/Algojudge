import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import CSS file

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegisterButtonClick = () => {
    navigate("/register"); // Navigate to registration page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://65.2.136.44:8000/user/api/login/",
        formData
      );
      const { access } = response.data.tokens; // Extract the access token from the response
        localStorage.setItem("accessToken", access); // Save the access token in local storage
        console.log(access)
      console.log(response.data);
      // Redirect to dashboard or homepage on successful login
      navigate("/questions"); // Example route, change it to your desired route
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError("Invalid credentials"); // Set error message
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="register-button" onClick={handleRegisterButtonClick}>Register</button>
    </div>
  );
};

export default LoginForm;
