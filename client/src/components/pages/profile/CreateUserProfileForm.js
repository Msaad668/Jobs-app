import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUserProfile, getCurrentProfile } from "../../../actions/profile";

const initialState = {
  companyName: "",
  title: "",
  website: "",
  location: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  instagram: "",
};

const CreateUserProfileForm = ({
  profile: { profile, loading },
  createUserProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    companyName,
    website,
    location,
    title,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createUserProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <div
        className="container
      "
      >
        <h1 className="large text-primary">Edit Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user" /> Add some changes to your profile
        </p>
        <small>* = required field</small>
        <hr />
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label for="exampleInputPassword1">title</label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              name="title"
              value={title}
              onChange={onChange}
            />
            <small className="form-text">eg. mechanical engineer</small>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">summary || bio</label>
            <textarea
              placeholder="A bio of the company..."
              class="form-control"
              name="bio"
              value={bio}
              onChange={onChange}
            />
            <small className="form-text">
              enter a summary of your company...
            </small>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">company name</label>
            <input
              type="text"
              placeholder="Company name..."
              name="companyName"
              value={companyName}
              onChange={onChange}
              class="form-control"
            />
            <small className="form-text">
              enter the company or the startup name
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">website</label>
            <input
              type="text"
              class="form-control"
              placeholder="Website"
              name="website"
              value={website}
              onChange={onChange}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">address</label>
            <input
              type="text"
              class="form-control"
              placeholder="Location"
              name="location"
              value={location}
              onChange={onChange}
            />
            <small className="form-text">
              City and country suggested (eg. cairo, egypt)
            </small>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">skills</label>
            <input
              type="text"
              class="form-control"
              placeholder="Skills..."
              name="skills"
              value={skills}
              onChange={onChange}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={onChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={onChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={onChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={onChange}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary btn-lg m-1" />
          <Link className="btn btn-success btn-lg m-1" to="/emp-profile">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

// CreateEmployerProfileForm.propTypes = {
//   createEmployerProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createUserProfile,
  getCurrentProfile,
})(CreateUserProfileForm);
