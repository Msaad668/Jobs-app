import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import {
  getApplications,
  putInConsideration,
  notSelect,
} from "../../../actions/jobs";
import { useEffect } from "react";

const Applications = ({
  applications,
  loading,
  getApplications,
  match,
  putInConsideration,
  history,
  notSelect,
}) => {
  useEffect(() => {
    getApplications(match.params.id);
  }, [getApplications, match.params.id]);

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
        <h1 className="large text-primary padd-1  text-center">
          all applications the job has recieved
        </h1>

        {applications.map((application) => {
          let color = "light";
          if (application.status === "In consideration") {
            color = "success";
          } else if (application.status === "not selected") {
            color = "danger";
          }
          return (
            <div key={application._id} className="profile-wrapper my-2">
              <div className="padd-1">
                <h3 className=" margin-1">
                  applicant name:{" "}
                  <Link
                    to={`/jobs/myjobs/applications/user-info/${application.user}`}
                  >
                    {application.name}
                  </Link>
                </h3>
                <h4 className="margin-1">
                  status:{" "}
                  <span class={`badge badge-${color}`}>
                    {" "}
                    {application.status}
                  </span>
                </h4>
                <Link
                  to={`/jobs/myjobs/applications/user-info/${application.user}`}
                  type="button"
                  class="btn btn-secondary btn-lg margin-1"
                >
                  applicant profile
                </Link>
                <button
                  type="button"
                  class="btn btn-success btn-lg margin-1"
                  onClick={() =>
                    putInConsideration(
                      match.params.id,
                      application._id,
                      history
                    )
                  }
                >
                  put in consideration
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-lg margin-1"
                  onClick={() =>
                    notSelect(match.params.id, application._id, history)
                  }
                >
                  not select applicant
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
  applications: state.job.applications,
  loading: state.job.loading,
});

export default connect(mapStateToProps, {
  getApplications,
  putInConsideration,
  notSelect,
})(Applications);
