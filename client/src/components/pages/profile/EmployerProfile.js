import React, { Fragment } from "react";
import { getCurrentProfile } from "../../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../layout/Spinner";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";

const EmployerProfile = ({
  user,
  profile,
  getCurrentProfile,
  loading,
  setAlert,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (user && user.isCompany === false) {
    return (
      <div className="user-profile">
        <h1 class="text-center  p-4">
          not authorized to get an employer profile
        </h1>
      </div>
    );
  }

  if (!loading && !profile) {
    setAlert("please create a profile first", "success", 5000);
    return <Redirect to="/create-edit-employer-profile" />;
  }

  return (
    <div class="single-job-page padd-2" style={{ boxSizing: "border-box" }}>
      {!loading && profile !== null ? (
        <Fragment>
          <div className="profile-wrapper marginbottom-1 mr-1 ">
            <h2 class="padd-1">welcome {user && user.name}</h2>

            <div class="links padd-1 ">
              <Link
                to="/create-edit-employer-profile"
                type="button"
                class="btn btn-success btn-lg mx-1 my-1"
              >
                {profile.companyName ? "edit" : "create"} profile
              </Link>
              <Link
                to="/jobs/create-job"
                type="button"
                class="btn btn-success btn-lg mx-1 my-1"
              >
                add new job
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="profile-wrapper  mr-1">
                <div className="padd-2" style={{ fontSize: "1.5rem" }}>
                  <h3 class="py-1">company name: {profile.companyName}</h3>
                  <hr />
                  <p className="">location: {profile.location}</p>
                  <hr />
                  <p>bio: {profile.bio}</p>
                </div>
              </div>

              <div className="profile-wrapper  margintop-1 mr-1">
                <div className="padd-2">
                  <h3>jobs published:</h3>
                  {user.jobsPublished.map((job) => {
                    return <h3>{job.title}</h3>;
                  })}
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="profile-wrapper mr-1">
                <div className="padd-2" style={{ fontSize: "1.1rem" }}>
                  <p>year founded : {profile.yearFounded}</p>
                  <hr />
                  <p>website : {profile.website}</p>
                  <hr />
                  <p>number of employees : {profile.numberEmployees}</p>
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

export default connect(mapStateToProps, { getCurrentProfile, setAlert })(
  EmployerProfile
);
