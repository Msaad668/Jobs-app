import React, { Fragment, useState } from "react";
import { registerUser } from "../../../actions/auth";
import { setAlert } from "../../../actions/alert";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

const SignUpUser = ({ isAuthenticated, setAlert, registerUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
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
              sign up as a job seeker
            </h3>
            <div className="form-group ">
              <label htmlFor="employerNmae">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name..."
                value={name}
                onChange={onChange}
                name="name"
                required
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email..."
                value={email}
                onChange={onChange}
                name="email"
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
                placeholder="Password"
                value={password}
                onChange={onChange}
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">confirm password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password2}
                onChange={onChange}
                name="password2"
                required
              />
            </div>
            <button
              type="submit"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-primary btn-block search-button my-4"
              onClick={onSubmit}
            >
              Submit
            </button>
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

export default connect(mapStateToProps, { setAlert, registerUser })(SignUpUser);
