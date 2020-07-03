import React from "react";
import { Link } from "react-router-dom";

const JobItem = ({ job: { _id, title, employerName, description } }) => {
  return (
    <div className="job-card">
      <div className="p-3">
        <h4 className=" ">
          <Link
            to={`/job/${_id}`}
            className="text-decoration-none font-weight-bolder"
          >
            {title}
          </Link>
          <small className="text-muted">- 4 days ago</small>
        </h4>

        <h5>
          <Link className="text-decoration-none" to="/">
            {employerName}
          </Link>{" "}
          - cairo, egypt
        </h5>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default JobItem;
