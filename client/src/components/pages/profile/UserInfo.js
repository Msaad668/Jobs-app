import React, { Fragment } from "react";
import { getUserProfileById } from "../../../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../layout/Spinner";
import Moment from "react-moment";
import moment from "moment";
import { Link } from "react-router-dom";
import { setAlert } from "../../../actions/alert";

const UserInfo = ({
  userInfo,
  getUserProfileById,
  loading,
  setAlert,
  match,
}) => {
  useEffect(() => {
    getUserProfileById(match.params.id);
  }, [getUserProfileById, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div class="user-profile">
      <div class="container padd-2">
        {!loading && userInfo !== null ? (
          <Fragment>
            <div class="links py-2">
              <Link
                to="/create-edit-user-profile"
                type="button"
                class="btn btn-secondary mx-2"
              >
                back to applications
              </Link>
              <Link
                to="/profile/add-experience"
                type="button"
                class="btn btn-success mx-2"
              >
                put applicant in consideration
              </Link>
              <Link
                to="/profile/add-education"
                type="button"
                class="btn btn-danger mx-2"
              >
                not select applicant
              </Link>
            </div>

            <div class="profile-wrapper shadow  my-2">
              <div class="p-4">
                <h2 class="text-center p-2">main information</h2>
                <h3>Title : {userInfo.title ? userInfo.title : ""}</h3>
                <hr />
                <h5>
                  <strong> bio : </strong> {userInfo.bio ? userInfo.bio : ""}
                </h5>
                <hr />
                <h4>location : {userInfo.location ? userInfo.location : ""}</h4>
                <hr />
                <h4>current employer : the awesome place</h4>
              </div>
            </div>

            <div class="profile-wrapper shadow  my-3">
              <div class="p-4">
                <h2 class="text-center p-2">skills</h2>

                <div class="w-75 mx-auto p-1">
                  {userInfo.skills.map((skill, index) => (
                    <div key={index} className="p-1">
                      <i className="fas fa-check" />
                      {"  "}
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="profile-wrapper shadow  my-3">
              <div class="p-4">
                <h2 class="text-center p-2">Education</h2>
                {userInfo.education.length > 0 ? (
                  <Fragment>
                    {userInfo.education.map((education) => (
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

            <div class="profile-wrapper shadow  my-3">
              <div class="p-4">
                <h2 class="text-center p-2">Experience</h2>
                {userInfo.experience.length > 0 ? (
                  <Fragment>
                    {userInfo.experience.map((experience) => (
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

                        <hr />
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
            </div>
          </Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.profile.userInfo,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, {
  getUserProfileById,
  setAlert,
})(UserInfo);
