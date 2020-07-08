import React, { useEffect, Fragment } from "react";
import { getJob, applyToJob } from "../../../actions/jobs";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { Link } from "react-router-dom";
import { setAlert } from "../../../actions/alert";

const Job = ({
  job: { job, loading },
  getJob,
  applyToJob,
  match,
  user,
  isEmployer,
  isAuthenticated,
  setAlert,
}) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return (
    <div class="single-job-page padd-2" style={{ boxSizing: "border-box" }}>
      {!loading && job !== null ? (
        <Fragment>
          <div className="row">
            <div className="col-sm-8">
              <div className="profile-wrapper  ">
                <div className="padd-2" style={{ fontSize: "1.5rem" }}>
                  <p>{job.title}</p>
                  <Link
                    to={`/company-info/${job.company}`}
                    className="text-decoration-none"
                  >
                    {job.employerName}
                  </Link>
                  <p className="text-muted">{job.locationOfTheJob}</p>
                  <hr />
                  <div class="row">
                    <div class="col-sm-8">
                      <button
                        type="button"
                        style={{ fontSize: "1.4rem", minWidth: "25vh" }}
                        className={`btn btn-success `}
                        onClick={() =>
                          !isAuthenticated
                            ? setAlert(
                                "you have to login/register as a user first",
                                "danger",
                                5000
                              )
                            : applyToJob(job._id)
                        }
                        disabled={isEmployer}
                      >
                        Apply for job
                      </button>
                      <br />
                      {isEmployer ? (
                        <small style={{ fontSize: ".9rem" }}>
                          you have to login as a user to apply
                        </small>
                      ) : null}

                      <br />
                    </div>
                    <div
                      class="col-sm-4 m-1"
                      style={{ fontSize: "1.1rem", maxWidth: "16rem" }}
                    >
                      <p>
                        115 applicants for {job.numberOfVacancies} open{" "}
                        {job.numberOfVacancies > 1 ? "positions" : "position"}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-wrapper  my-2 ">
                <div className="padd-2">
                  <h3>About the job:</h3>
                  <p style={{ fontSize: "1.rem" }}>{job.description}</p>
                  <h3>job requirements:</h3>
                  <ul style={{ fontSize: "1.2rem" }}>
                    {job.jobRequirements[0].split(",").map((req) => {
                      return <li>{req}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="profile-wrapper">
                <div className="padd-2" style={{ fontSize: "1.1rem" }}>
                  <p>Experience needed : {job.expNeeded}</p>
                  <hr />
                  <p>salary : {job.salary}</p>
                  <hr />
                  <p>jobType : {job.jobType}</p>
                  <hr />
                  <p>vacancies : {job.numberOfVacancies}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isEmployer: state.auth.isEmployer,
});

export default connect(mapStateToProps, { getJob, applyToJob, setAlert })(Job);
