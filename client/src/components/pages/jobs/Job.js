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
    <div class="single-job-page p-5" style={{}}>
      {!loading && job !== null ? (
        <Fragment>
          <div className="row">
            <div className="col-7">
              <div className="profile-wrapper mb-4 ml-4 ">
                <div className="p-4" style={{ fontSize: "2rem" }}>
                  <p>{job.title}</p>
                  <Link t0="/" className="text-decoration-none">
                    {job.employerName}
                  </Link>
                  <p className="text-muted">{job.locationOfTheJob}</p>
                  <hr />
                  <div class="row">
                    <div class="col-8">
                      <button
                        type="button"
                        style={{ fontSize: "1.5rem", minWidth: "15rem" }}
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

              <div className="profile-wrapper  mt-4 ml-4 ">
                <div className="p-4">
                  <h2>About the job:</h2>
                  <p style={{ fontSize: "1.3rem" }}>
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
                  <h2>job requirements:</h2>
                  <ul style={{ fontSize: "1.3rem" }}>
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

            <div className="col-4">
              <div className="profile-wrapper ">
                <div className="p-4" style={{ fontSize: "1.4rem" }}>
                  <p>Experience needed : {job.expNeeded}</p>
                  <hr />
                  <p>salary : {job.salary}</p>
                  <hr />
                  <p>jobType : {job.jobType}</p>
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
