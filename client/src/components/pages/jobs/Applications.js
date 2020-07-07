import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { getApplications } from "../../../actions/jobs";
import { useEffect } from "react";

const Applications = ({ applications, loading, getApplications, match }) => {
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
        <h1 className="large text-primary padd-2  text-center">
          all applications the job has recieved
        </h1>

        {applications.map((application) => {
          return (
            <div key={application._id} className="profile-wrapper my-2">
              <div className="padd-2">
                <h3 className=" margin-1">
                  applicant name: <Link to={`/`}>{application.name}</Link>
                </h3>
                <button type="button" class="btn btn-secondary btn-lg margin-1">
                  applicant profile
                </button>
                <Link
                  to={`/`}
                  type="button"
                  class="btn btn-success btn-lg margin-1"
                >
                  put in consideration
                </Link>
                <button type="button" class="btn btn-danger btn-lg margin-1">
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

export default connect(mapStateToProps, { getApplications })(Applications);
