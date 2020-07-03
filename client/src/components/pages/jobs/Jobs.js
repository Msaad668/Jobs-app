import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getJobs } from "../../../actions/jobs";
import JobItem from "./JobItem";
import Spinner from "../../layout/Spinner";

const Jobs = ({ getJobs, jobs: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <div class="jobs">
      <div class="container">
        <h2>Explore new opportunities</h2>

        <div className="search">
          <input
            type="text"
            class="form-control my-3"
            placeholder="Search jobs..."
          />
          <button type="button" class="btn btn-secondary btn-lg btn-block my-3">
            search
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : jobs.length !== 0 ? (
          jobs.map((job) => {
            return <JobItem key={job._id} job={job} />;
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            {" "}
            <h1>no jobs found</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobs: state.job,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
