import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { unapplyToJob } from "../../../actions/jobs";

const MyApplications = ({ user, loading, unapplyToJob }) => {
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
          Your applications
        </h1>

        {user.jobsAppliedTo.map((job) => {
          let color = "light";
          if (job.status === "In consideration") {
            color = "success";
          } else if (job.status === "not selected") {
            color = "danger";
          }
          return (
            <div key={job._id} className="profile-wrapper my-2">
              <div className="padd-2">
                <h3 className="text-primary margin-1">
                  <Link to={`/job/${job.job}`}>{job.title}</Link>
                </h3>
                <h5 className=" margin-1">{job.employerName}</h5>
                <h4 className="margin-1">
                  status:{" "}
                  <span class={`badge badge-${color}`}> {job.status}</span>
                </h4>
                <button
                  type="button"
                  class="btn btn-secondary btn-lg marginleft-1"
                  onClick={() => unapplyToJob(job.job, job.application)}
                >
                  withdraw application
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

export default connect(mapStateToProps, { unapplyToJob })(MyApplications);
