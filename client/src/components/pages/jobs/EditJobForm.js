import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateJob, getJob } from "../../../actions/jobs";

const initialState = {
  description: "",
  jobUrl: "",
  jobRequirements: "",
  expNeeded: "",
  jobType: "",
  numberOfVacancies: "",
  salary: "",
  locationOfTheJob: "",
};

const EditJobForm = ({ updateJob, history, match, loading, job, getJob }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (job && job._id !== match.params.id) getJob(match.params.id);
    if (!loading && job) {
      const jobData = { ...initialState };
      for (const key in job) {
        if (key in jobData) jobData[key] = job[key];
      }
      if (Array.isArray(jobData.jobRequirements))
        jobData.jobRequirements = jobData.jobRequirements.join(", ");
      setFormData(jobData);
    }
  }, [loading, getJob, job, match.params.id]);

  const {
    description,
    jobUrl,
    jobRequirements,
    expNeeded,
    jobType,
    numberOfVacancies,
    salary,
    locationOfTheJob,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">update job</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> please fill in the following
          inputs
        </p>
        <small>* = required field</small>
        <hr />
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            updateJob(match.params.id, formData, history);
          }}
        >
          <div className="form-group">
            <label>years of experience*</label>
            <input
              type="text"
              className="form-control"
              placeholder="* years of experience needed"
              name="expNeeded"
              value={expNeeded}
              onChange={onChange}
              required
            />
            <small className="form-text">.eg more than 2 years</small>
          </div>
          <div className="form-group">
            <label>job type*</label>
            <select
              class="form-control"
              name="jobType"
              value={jobType}
              onChange={onChange}
            >
              <option>* select job type</option>
              <option value="full time">Full time</option>
              <option value="part time">part time</option>
              <option value="work from home">work from home</option>
            </select>
            <small className="form-text">
              * required, please choose the job Type
            </small>
          </div>

          <div className="form-group">
            <label>job url</label>
            <input
              type="text"
              className="form-control"
              placeholder="job url..."
              name="jobUrl"
              value={jobUrl}
              onChange={onChange}
            />
            <small className="form-text">.eg www.orascom.com</small>
          </div>
          <div className="form-group">
            <label>location of the job*</label>
            <input
              type="text"
              className="form-control"
              placeholder="* location of the job"
              name="locationOfTheJob"
              value={locationOfTheJob}
              onChange={onChange}
              required
            />
            <small className="form-text">.eg nasr city, cairo</small>
          </div>
          <div className="form-group">
            <label>number of vacancies*</label>
            <input
              type="number"
              className="form-control"
              placeholder="number of vacancies..."
              name="numberOfVacancies"
              value={numberOfVacancies}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>salary</label>
            <input
              type="text"
              className="form-control"
              placeholder="salary..."
              name="salary"
              value={salary}
              onChange={onChange}
            />
            <small className="form-text">.eg 8000 egp</small>
          </div>
          <div className="form-group">
            <label>jobRequirements*</label>
            <input
              type="text"
              class="form-control"
              placeholder="job requirements..."
              name="jobRequirements"
              value={jobRequirements}
              onChange={onChange}
              required
            />
            <small className="form-text">
              you have to use '/' separated values (eg. good grasp on javascript
              / hard worker / etc)
            </small>
          </div>
          <div className="form-group">
            <label>description*</label>
            <textarea
              name="description"
              className="form-control"
              cols="30"
              rows="5"
              placeholder="job description..."
              value={description}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary btn-lg m-1" />
          <Link className="btn btn-success btn-lg my-1" to="/jobs">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  job: state.job.job,
  loading: state.job.loading,
});

export default connect(mapStateToProps, { updateJob, getJob })(EditJobForm);
