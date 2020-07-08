import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Home = () => {
  return (
    <div class="home">
      <div className="container">
        <h1 class="main1">Jobs Portal</h1>
        <p class="main2">Find the Best Jobs in Egypt</p>
        <p class="main3">
          Searching for vacancies and career opportunities? jobs portal helps{" "}
          <br /> you in your job search.
        </p>

        <Link
          to="/jobs"
          type="button"
          class="btn btn-secondary btn-lg btn-block search-button my-3"
          style={{ maxWidth: "85vh", margin: "auto" }}
        >
          SEE ALL JOBS
        </Link>
        <Link
          to="/login"
          type="button"
          class="btn btn-primary btn-lg btn-block search-button my-3"
          style={{ maxWidth: "85vh", margin: "auto" }}
        >
          login
        </Link>
        <Link
          to="/signup/user"
          type="button"
          class="btn btn-primary btn-lg btn-block search-button my-3"
          style={{ maxWidth: "85vh", margin: "auto" }}
        >
          sign up as a user
        </Link>
        <Link
          to="/signup/employer"
          type="button"
          class="btn btn-success btn-lg btn-block search-button my-3"
          style={{ maxWidth: "85vh", margin: "auto" }}
        >
          sign up as an employer
        </Link>
      </div>
    </div>
  );
};

export default connect(null, {})(Home);
