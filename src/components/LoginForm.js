import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in by verifying the presence of the token
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://nodeproject-1-wo8x.onrender.com/api/login", formData);
      localStorage.setItem("authToken", response.data.token);
      setLoading(false);
      navigate("/dashboard"); // Navigate to dashboard after successful login
      //reload the page
        window.location.reload();
    } catch (err) {
      console.error("Error logging in:", err);
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup"); // Navigate to sign-up page
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="signup-redirect">
        <p>Don't have an account?</p>
        <button onClick={handleSignUpRedirect}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginForm;
