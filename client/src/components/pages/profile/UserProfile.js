import React, { Fragment } from "react";
import { getCurrentProfile } from "../../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../layout/Spinner";
import Moment from "react-moment";
import moment from "moment";

const UserProfile = ({ user, profile, getCurrentProfile, loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  console.log();

  return (
    <div class="user-profile">
      <div class="container p-1">
        {loading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <h2 class="py-2">welcome {user ? user.name : "hey"}</h2>

            <div class="links py-2">
              <button type="button" class="btn btn-success mx-2">
                {profile.companyName ? "edit" : "create"} profile
              </button>
              <button type="button" class="btn btn-success mx-2">
                add experience
              </button>
              <button type="button" class="btn btn-success mx-2">
                add education
              </button>
            </div>

            <div class="profile-wrapper shadow w-75 my-3">
              <div class="p-4">
                <h2 class="text-center p-2">main information</h2>
                <h3>Title : {profile.title ? profile.title : ""}</h3>
                <hr />
                <h5>
                  <strong> bio : </strong> {profile.bio ? profile.bio : ""}
                </h5>
                <hr />
                <h4>location : {profile.location ? profile.location : ""}</h4>
                <hr />
                <h4>current employer : the awesome place</h4>
              </div>
            </div>

            <div class="profile-wrapper shadow w-75 my-3">
              <div class="p-4">
                <h2 class="text-center p-2">skills</h2>

                <div class="w-75 mx-auto p-1">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="p-1">
                      <i className="fas fa-check" />
                      {"  "}
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="profile-wrapper shadow w-75 my-3">
              <div class="p-4">
                <h2 class="text-center p-2">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <div key={education._id}>
                        <h3 className="text-dark">{education.school}</h3>
                        <p>
                          <Moment format="YYYY/MM/DD">
                            {moment.utc(education.from)}
                          </Moment>{" "}
                          -{" "}
                          {!education.to ? (
                            " Now"
                          ) : (
                            <Moment format="YYYY/MM/DD">
                              {moment.utc(education.to)}
                            </Moment>
                          )}
                        </p>
                        <p>
                          <strong>Degree: </strong> {education.degree}
                        </p>
                        <p>
                          <strong>Field Of Study: </strong>{" "}
                          {education.fieldofstudy}
                        </p>
                        <p>
                          <strong>Description: </strong> {education.description}
                        </p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>
            </div>

            <div class="profile-wrapper shadow w-75 my-3">
              <div class="p-4">
                <h2 class="text-center p-2">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <div key={experience._id}>
                        <h3 style={{ color: "#0d56d9", opacity: ".6" }}>
                          {experience.company}
                        </h3>
                        <p>
                          <Moment format="YYYY/MM/DD">
                            {moment.utc(experience.from)}
                          </Moment>{" "}
                          -{" "}
                          {!experience.to ? (
                            " Now"
                          ) : (
                            <Moment format="YYYY/MM/DD">
                              {moment.utc(experience.to)}
                            </Moment>
                          )}
                        </p>
                        <p>
                          <strong>Position: </strong> {experience.title}
                        </p>
                        <p>
                          <strong>Location: </strong> {experience.location}
                        </p>
                        <p>
                          <strong>Description: </strong>{" "}
                          {experience.description}
                        </p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCurrentProfile })(UserProfile);
