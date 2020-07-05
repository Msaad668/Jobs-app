import React, { useEffect, Fragment } from "react";
import { getJob } from "../../../actions/jobs";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { Link } from "react-router-dom";

const Job = ({ job: { job, loading }, getJob, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return (
    <div class="single-job-page padd-2" style={{}}>
      {!loading && job !== null ? (
        <Fragment>
          <div className="row">
            <div className="col-8">
              <div className="profile-wrapper  ">
                <div className="padd-2" style={{ fontSize: "1.5rem" }}>
                  <p>{job.title}</p>
                  <Link to="/" className="text-decoration-none">
                    {job.employerName}
                  </Link>
                  <p className="text-muted">{job.locationOfTheJob}</p>
                  <hr />
                  <div class="row">
                    <div class="col-8">
                      <button
                        type="button"
                        style={{ fontSize: "1.4rem", minWidth: "25vh" }}
                        className="btn btn-success "
                      >
                        Apply for job
                      </button>
                    </div>
                    <div
                      class="col-4 "
                      style={{ fontSize: "1.1rem", maxWidth: "16rem" }}
                    >
                      <p>115 applicants for {job.vacancies} open position </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-wrapper  margintop-2 ">
                <div className="padd-2">
                  <h3>About the job:</h3>
                  <p style={{ fontSize: "1.rem" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati odit saepe exercitationem accusantium fugit
                    laborum nihil tempore ratione error? Itaque consequatur odio
                    reiciendis impedit cumque, quis vel nihil. Porro eum
                    expedita soluta vitae dolorem? Consequuntur doloremque
                    assumenda dolores laboriosam sit sed vel quaerat
                    necessitatibus ullam ex repellat quis veritatis dolore
                    commodi harum quia et, nulla, rerum excepturi.
                    Exercitationem, dolor natus? kldjfj kfijeogeh weihfi;erhfrh
                    hjfjh kjfdhkjehfrkj ejkhfjhefj jewhrfeh
                  </p>
                  <h3>job requirements:</h3>
                  <ul style={{ fontSize: "1.2rem" }}>
                    <li>wjkfdhkjwfhjfg</li>
                    <li>wjkfdhkjwfhjfg</li>
                    <li>wjkfdhkjwfhjfg</li>
                    <li>wjkfdhkjwfhjfg</li>
                    <li>wjkfdhkjwfhjfg</li>
                    <li>wjkfdhkjwfhjfg</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="col-4"
              style={{ paddingLeft: "0", marginLeft: "0" }}
            >
              <div className="profile-wrapper">
                <div className="padd-2" style={{ fontSize: "1.1rem" }}>
                  <p>Experience needed : jkhfsdfg{job.expNeeded}</p>
                  <hr />
                  <p>salary : 46454{job.salary}</p>
                  <hr />
                  <p>jobType : full time{job.jobType}</p>
                  <hr />
                  <p>vacancies : {job.numberOfVacancies}</p>
                  <hr />
                  <p>career level : {job.expNeeded}</p>
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
});

export default connect(mapStateToProps, { getJob })(Job);
