import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <Link to="/" class="navbar-brand">
        <i className="fas fa-address-book" /> jobs Portal
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/" class="nav-link">
              Home <span class="sr-only">(current)</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/jobs">
              jobs
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/add-job">
              add job
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/signin">
              sign in
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/">
              sign out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
