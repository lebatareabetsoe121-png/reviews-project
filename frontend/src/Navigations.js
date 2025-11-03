import React from "react";
import { Link } from "react-router-dom";

function Navigations() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        
        <Link className="navbar-brand fw-bold" to="/">Restaurant Reviews</Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link className="nav-link text-light fw-semibold" to="/">Home</Link>
            </li>

            <li className="nav-item me-3">
              <Link className="nav-link text-light fw-semibold" to="/myreviews">My Reviews</Link>
            </li>
              <li className="nav-item me-3">
              <Link className="nav-link text-light fw-semibold" to="/top">Top Rated</Link>
            </li>
            <button
            className="btn btn-warning btn-sm"
            onClick={() => {
              localStorage.removeItem("username");
              window.location.reload(); 
            }}
          >
            Logout
          </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigations;
