import React, { Fragment } from "react";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/jobs" />;
  }

  return (
    <Fragment>
      <form className="container my-5">
        <div
          className="mx-auto login"
          style={{ maxWidth: "600px", fontSize: "1.5rem" }}
        >
          <div className="p-4">
            <h3
              className="my-2"
              style={{ textAlign: "center", color: "darkblue" }}
            >
              Login
            </h3>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                value={email}
                onChange={onChange}
                name="email"
                placeholder="Enter email..."
                required
              />
              <small
                id="emailHelp"
                style={{ fontSize: "1rem" }}
                className="form-text text-muted"
              >
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password..."
                value={password}
                name="password"
                onChange={onChange}
                required
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-primary btn-block search-button my-4"
            >
              Submit
            </button>
            <p className="my-1" style={{ fontSize: "1rem" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <Link
              to="/"
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-success btn-block search-button my-3"
            >
              back to Homepage
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
