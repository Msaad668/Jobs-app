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
                  {profile.user.jobsPublished.map((job) => {
                    return (
                      <h3>
                        <Link
                          to={`/job/${job._id}`}
                          className="text-decoration-none font-weight-bolder"
                        >
                          {job.title}
                        </Link>
                      </h3>
                    );
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
});

export default connect(mapStateToProps, { getProfileById })(CompanyInfo);
