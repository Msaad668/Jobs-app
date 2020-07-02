import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="home">
      <div class="ml-auto buttons">
        <Link
          to="/login"
          class="btn btn-outline-info btn-lg"
          href="#"
          role="button"
        >
          Login
        </Link>
        <Link
          to="add-job"
          class="btn btn-outline-primary btn-lg"
          href="#"
          role="button"
        >
          Sign up
        </Link>
        <Link
          to="add-job"
          class="btn btn-outline-success btn-lg"
          href="#"
          role="button"
        >
          Employer?
        </Link>
      </div>

      <h1 class="main1">Jobs Portal</h1>
      <p class="main2">Find the Best Jobs in Egypt</p>

      <p class="main3">
        Searching for vacancies and career opportunities? jobs portal helps{" "}
        <br /> you in your job search.
      </p>

      <div className="search" style={{ maxWidth: "85vh", margin: "auto" }}>
        <input
          type="text"
          class="form-control search-input"
          placeholder="Search jobs..."
        />
        <button
          type="button"
          class="btn btn-secondary btn-lg btn-block search-button"
        >
          SEARCH
        </button>
      </div>

      <button
        type="button"
        class="btn btn-success btn-lg btn-block search-button my-5"
        style={{ maxWidth: "85vh", margin: "auto" }}
      >
        SEE ALL JOBS
      </button>
    </div>
  );
};

export default Home;
