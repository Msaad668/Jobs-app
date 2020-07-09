import React, { Fragment } from "react";
import { getProfileById } from "../../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../layout/Spinner";
import { Link } from "react-router-dom";

const CompanyInfo = ({ profile, getProfileById, loading, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <div class="single-job-page padd-2" style={{ boxSizing: "border-box" }}>
      {!loading && profile !== null ? (
        <Fragment>
          <div className="row">
            <div className="col-sm-8">
              <div className="profile-wrapper my-2 mr-1">
                <div className="padd-2" style={{ fontSize: "1.5rem" }}>
                  <p class="py-1"> {profile.companyName}</p>
                  <hr />
                  <p className="">location: {profile.location}</p>
                  <hr />
                  <p>bio: {profile.bio}</p>
                </div>
              </div>

              <div className="profile-wrapper  my-1 mr-1">
                <div className="padd-2">
                  <h2 class="mb-3">jobs published:</h2>
                  {profile.user.jobsPublished.map((job) => {
                    return (
                      <div
                        className="p-2 my-2"
                        style={{
                          border: "1px solid darkgray",
                          borderRadius: "1rem",
                        }}
                      >
                        <h3>
                          <Link
                            to={`/job/${job.job}`}
                            className="text-decoration-none font-weight-bolder "
                          >
                            {job.title}
                          </Link>
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="profile-wrapper my-1 mr-1">
                <div className="padd-2" style={{ fontSize: "1.1rem" }}>
                  <p>year founded : {profile.yearFounded}</p>
                  <hr />
                  <p>website : {profile.website}</p>
                  <hr />
                  <p>number of employees : {profile.numberOfEmployees}</p>
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
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfileById })(CompanyInfo);
