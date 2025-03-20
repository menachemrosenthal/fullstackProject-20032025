import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import AnswerQuestion from "../components/answer.js";
import AskQuestion from "../components/questions.js";

import "./styles.css";
function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      alert("NO USER");
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      {user && (
        <>
          <div className="header">
            <h1>Welcome, {user.username}</h1>
            <div className="nav">
              
              <button onClick={handleLogout} className="button">
                Logout
              </button>
            </div>
            <>
              {user.role === "student" ? (
                <AskQuestion user={user} />
              ) : (
                <AnswerQuestion user={user} />
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
