import React, { useEffect, Fragment } from "react";

import { connect } from "react-redux";
import { getJobs, filterJobs, clearFilter } from "../../../actions/jobs";
import JobItem from "./JobItem";
import Spinner from "../../layout/Spinner";
import { useState } from "react";

const Jobs = ({
  getJobs,
  clearFilter,
  filterJobs,
  jobs: { jobs, loading, filtered },
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    clearFilter();
    getJobs();
  }, [getJobs]);

  return (
    <div class="jobs">
      <div class="container p-1">
        <h2 class="my-4 " style={{ textAlign: "center" }}>
          Explore new opportunities
        </h2>

        <div className="w-75 mx-auto">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
            type="text"
            class="form-control p-3 my-3"
            placeholder="Search jobs..."
          />
          <button
            onClick={() => {
              filterJobs(text);
              setText("");
            }}
            type="button"
            class="btn btn-secondary btn-lg btn-block my-3"
          >
            search
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {filtered.length !== 0 ? (
              filtered.map((job) => <JobItem key={job._id} job={job} />)
            ) : (
              <Fragment>
                {jobs.length !== 0 ? (
                  jobs.map((job) => <JobItem key={job._id} job={job} />)
                ) : (
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <h1>no jobs found</h1>{" "}
                  </div>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobs: state.job,
});

export default connect(mapStateToProps, { getJobs, filterJobs, clearFilter })(
  Jobs
);
