import React, { useEffect } from "react";
import { getJob } from "../../../actions/jobs";
import { connect } from "react-redux";

const Job = ({ job: { job, loading }, getJob, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return (
    <div style={{ color: "black" }}>
      <h1>hey there</h1>
      {!loading && (
        <div className="m-4">
          <p>title : {job.title}</p>
          <p> description : {job.description}</p>
          <p> employerName : {job.employerName}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps, { getJob })(Job);
