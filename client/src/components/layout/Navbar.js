import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = ({ auth: { isAuthenticated, loading, isEmployer }, logout }) => {
  const employerLinks = (
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item ">
        <Link to="/" class="nav-link">
          Home
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/emp-profile">
          Profile
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/jobs/myjobs">
          my jobs
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/jobs">
          all jobs
        </Link>
      </li>

      <li onClick={logout} class="nav-item">
        <Link class="nav-link" to="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item ">
        <Link to="/" class="nav-link">
          Home
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
          applications
        </Link>
      </li>
      <li onClick={logout} class="nav-item">
        <Link class="nav-link" to="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item ">
        <Link to="/" class="nav-link">
          Home
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/jobs">
          jobs
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/signin">
          sign in
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <Link to="/" class="navbar-brand">
        <i className="fas fa-address-book" /> jobs Portal
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        {!loading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>{isEmployer ? employerLinks : userLinks}</Fragment>
            ) : (
              guestLinks
            )}
          </Fragment>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
