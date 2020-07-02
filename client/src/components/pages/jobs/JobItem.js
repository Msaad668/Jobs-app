import React from "react";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
  return (
    <div class="job-card">
      <div class="p-3">
        <h4 class=" ">
          <Link
            to={`/job/${job._id}`}
            class="text-decoration-none font-weight-bolder"
          >
            {job.title}
          </Link>
          <small class="text-muted">- 4 days ago</small>
        </h4>

        <h5>
          <Link class="text-decoration-none" href="#!">
            {job.employerName}
          </Link>{" "}
          - cairo, egypt
        </h5>
        <p class="">{job.description}</p>
      </div>
    </div>
  );
};

export default JobItem;
