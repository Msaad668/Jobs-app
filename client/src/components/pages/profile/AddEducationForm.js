import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any school or university that
          you have attended
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addEducation(formData, history);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              className="form-control"
              name="from"
              value={from}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={() =>
                  setFormData({ ...formData, current: !formData.current })
                }
              />{" "}
              Current School
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              className="form-control"
              name="to"
              value={to}
              onChange={onChange}
              disabled={current}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary btn-lg m-1" />
          <Link className="btn btn-success btn-lg m-1" to="/jobs">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
