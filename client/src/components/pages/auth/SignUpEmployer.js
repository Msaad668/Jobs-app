import React, { Fragment } from "react";

const SignUpEmployer = () => {
  return (
    <Fragment>
      <form className="container my-5">
        <div
          className="mx-auto login"
          style={{ maxWidth: "600px", fontSize: "1.5rem" }}
        >
          <div className="p-4">
            <div className="form-group ">
              <label htmlFor="employerNmae">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name..."
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email..."
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
              />
            </div>
            <button
              type="submit"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-primary btn-block search-button my-4"
            >
              Submit
            </button>
            <button
              type="button"
              style={{ fontSize: "1.2rem" }}
              className="btn btn-success btn-block search-button my-3"
            >
              back to Homepage
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUpEmployer;
