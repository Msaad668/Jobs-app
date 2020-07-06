import React, { Fragment } from "react";
import { getCurrentProfile } from "../../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../layout/Spinner";
import { Link } from "react-router-dom";

const EmployerProfile = ({ user, profile, getCurrentProfile, loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (!loading && profile !== null && profile.isEmployer === false) {
    return (
      <div className="user-profile">
        <h1 class="text-center p-4">not authorized to get a user profile</h1>
      </div>
    );
  }

  return (
    <div class="single-job-page padd-2" style={{ boxSizing: "border-box" }}>
      {!loading && profile !== null ? (
        <Fragment>
          <div className="profile-wrapper marginbottom-1 ">
            <h2 class="padd-1">welcome {user ? user.name : "hey"}</h2>

            <div class="links padd-1 ">
              <Link
                to="/create-edit-employer-profile"
                type="button"
                class="btn btn-success mx-1 my-1"
              >
                {profile.companyName ? "edit" : "create"} profile
              </Link>
              <button type="button" class="btn btn-success mx-1 my-1">
                add new job
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <div className="profile-wrapper  ">
                <div className="padd-2" style={{ fontSize: "1.5rem" }}>
                  <h3 class="py-1">company name: {profile.companyName}</h3>
                  <hr />
                  <p className="">location: {profile.location}</p>
                  <hr />
                  <p>bio: {profile.bio}</p>
                </div>
              </div>

              <div className="profile-wrapper  margintop-1 ">
                <div className="padd-2">
                  <h3>jobs published:</h3>
                  {user.jobsPublished.map((job) => {
                    return <h3>{job.title}</h3>;
                  })}
                </div>
              </div>
            </div>

            <div
              className="col-4"
              style={{ paddingLeft: "0", marginLeft: "0" }}
            >
              <div className="profile-wrapper">
                <div className="padd-2" style={{ fontSize: "1.1rem" }}>
                  <p>year founded : jkhfsdfg{profile.yearFounded}</p>
                  <hr />
                  <p>website : 46454{profile.website}</p>
                  <hr />
                  <p>
                    number of employees : full time{profile.numberOfEmployees}
                  </p>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCurrentProfile })(EmployerProfile);
