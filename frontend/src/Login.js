import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return alert("Please enter your name");

    localStorage.setItem("username", username);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
