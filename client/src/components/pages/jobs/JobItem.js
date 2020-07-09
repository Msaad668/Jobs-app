import React from "react";
import { Link } from "react-router-dom";

const JobItem = ({
  job: { _id, title, employerName, description, company },
}) => {
  return (
    <div className="profile-wrapper w-75 mx-auto my-3">
      <div className="p-2">
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
          <Link
            className="text-decoration-none"
            to={`/company-info/${company}`}
          >
            {employerName}
          </Link>{" "}
          - cairo, egypt
        </h5>
        <p>{description.split(" ").slice(0, 15).join(" ")} ...</p>
      </div>
    </div>
  );
};

export default JobItem;
