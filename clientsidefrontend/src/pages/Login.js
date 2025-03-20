import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    const response = await postData('auth/login', user);
    if (!response) {
      alert("Invalid credentials");
      return;
    } else {
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
