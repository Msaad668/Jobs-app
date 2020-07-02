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
        ) : (
          jobs.map((job) => {
            return <JobItem job={job} />;
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobs: state.job,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
