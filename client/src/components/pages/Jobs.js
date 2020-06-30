import React, { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/api/jobs").then((res) => {
      setJobs(res.data);
    });
  }, []);

  console.log(jobs);

  return (
    <div className="container">
      <h2>Explore New Career Opportunities..</h2>
      <div className="search">
        <input
          type="text"
          class="form-control search-input"
          placeholder="Search jobs..."
        />
        <button
          type="button"
          class="btn btn-secondary btn-lg btn-block search-button"
        >
          search
        </button>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">fullstack developer</h5>
          <h6 class="card-subtitle mb-2 text-muted">die freiheit firma</h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            style={{ marginRight: "1rem" }}
            type="button"
            class="btn btn-outline-secondary btn-lg"
          >
            apply
          </button>
          <a href="#" class="btn btn-primary">
            apply
          </a>
        </div>
      </div>

      {jobs.map((job) => {
        return (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{job.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">die freiheit firma</h6>
              <p class="card-text">{job.description}</p>
              <button
                style={{ marginRight: "1rem" }}
                type="button"
                class="btn btn-outline-secondary btn-lg"
              >
                apply
              </button>
              <a href="#" class="btn btn-primary">
                apply
              </a>
            </div>
          </div>
        );
      })}

      {/* <div class="card">
        <h3 class="card-header">Featured</h3>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Jobs;
