import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="jumbotron">
      <div className="container home">
        <h1 class="display-4">Jobs Portal</h1>
        <p class="lead">
          this is the jobs portal app, will help you find your match job.. have
          fun!
        </p>

        <Link to="/jobs" class="btn btn-primary btn-lg" href="#" role="button">
          see all Jobs
        </Link>
        <Link
          to="add-job"
          class="btn btn-primary btn-lg"
          href="#"
          role="button"
        >
          add new job
        </Link>
      </div>
    </div>
  );
};

export default Home;
