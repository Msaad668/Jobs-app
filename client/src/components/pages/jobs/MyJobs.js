import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { getJob, deleteJob } from "../../../actions/jobs";
import { useEffect } from "react";
import { loadUser } from "../../../actions/auth";

const MyJobs = ({ user, loading, getJob, loadUser, deleteJob }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="user-profile p-1">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="user-profile p-1">
      <div className="container">
        <h1 className="large text-primary padd-2  text-center">
          jobs you have published
        </h1>

        {user.jobsPublished.map((job) => {
          return (
            <div key={job._id} className="profile-wrapper my-2">
              <div className="padd-2">
                <h3 className="text-primary margin-1">
                  <Link to={`/job/${job.job}`}>{job.title}</Link>
                </h3>
                <button type="button" class="btn btn-success btn-lg margin-1">
                  see applications
                </button>
                <Link
                  to={`/jobs/myjobs/update-job/${job.job}`}
                  type="button"
                  class="btn btn-secondary btn-lg margin-1"
                  onClick={() => getJob(job.job)}
                >
                  update job
                </Link>
                <button
                  onClick={() => deleteJob(job.job)}
                  type="button"
                  class="btn btn-danger btn-lg margin-1"
                >
                  delete job
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getJob, loadUser, deleteJob })(
  MyJobs
);
