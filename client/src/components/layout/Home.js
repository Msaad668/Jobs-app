import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Home = () => {
  return (
    <div className="user-profile " style={{ background: "black" }}>
      <div class="home p-1">
        <div className="container">
          <h1 class="main1">Jobs Portal</h1>

          <p class="main3">
            Searching for vacancies and career opportunities? jobs portal helps{" "}
            <br /> you in your job search :)
          </p>

          <Link
            to="/jobs"
            type="button"
            class="btn btn-secondary btn-lg btn-block search-button my-3 "
            style={{
              maxWidth: "85vh",
              margin: "auto",
              fontSize: "1.5rem",
              borderRadius: "0",
            }}
          >
            See All Jobs
          </Link>
          <Link
            to="/login"
            type="button"
            class="btn btn-primary btn-lg btn-block search-button my-3"
            style={{
              maxWidth: "85vh",
              margin: "auto",
              fontSize: "1.5rem",
              borderRadius: "0",
            }}
          >
            login
          </Link>
          <Link
            to="/signup/user"
            type="button"
            class="btn btn-primary btn-lg btn-block search-button my-3"
            style={{
              maxWidth: "85vh",
              margin: "auto",
              fontSize: "1.5rem",
              borderRadius: "0",
            }}
          >
            sign up as a user
          </Link>
          <Link
            to="/signup/employer"
            type="button"
            class="btn btn-primary btn-lg btn-block search-button my-3"
            style={{
              maxWidth: "85vh",
              margin: "auto",
              fontSize: "1.5rem",
              borderRadius: "0",
            }}
          >
            sign up as an employer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {})(Home);
