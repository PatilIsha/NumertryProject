import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the authentication token
    localStorage.removeItem("userName"); // Optionally remove the username
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
