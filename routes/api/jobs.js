const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const Job = require("../../models/Job");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    POST api/jobs
// @desc     Create a job
// @access   Private
router.post(
  "/",
  [auth, [check("title", "title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.isCompany === false || user.isCompany == null) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user not authorized to create a job" }] });
      }

      const profile = await Profile.findOne({ user: req.user.id }).select(
        "companyName"
      );

      if (!profile) {
        return res.status(400).json({
          errors: [{ msg: "please create an employer profile first" }],
        });
      }

      const {
        title,
        description,
        jobUrl,
        jobRequirements,
        expNeeded,
        jobType,
        numberOfVacancies,
        salary,
        locationOfTheJob,
      } = req.body;

      const newJob = new Job({
        title,
        description,
        jobUrl,
        jobRequirements: Array.isArray(jobRequirements)
          ? jobRequirements
          : jobRequirements.split("/").map((skill) => " " + skill.trim()),
        employerName: profile.companyName,
        company: req.user.id,
        expNeeded,
        jobType,
        numberOfVacancies,
        salary,
        locationOfTheJob,
      });

      await newJob.save();

      const publishedJob = {
        job: newJob._id,
        title,
      };

      user.jobsPublished.push(publishedJob);

      await user.save();

      res.json(user.jobsPublished);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/jobs
// @desc     Get all jobs
// @access   public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().select("-applications").sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/jobs/:id
// @desc     Get job by ID
// @access   public
router.get("/:id", checkObjectId("id"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ errors: [{ msg: "job not found" }] });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/jobs/:id
// @desc     Delete a job
// @access   private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ errors: [{ msg: "job not found" }] });
    }

    // Check user
    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "user not authorized" }] });
    }

    await job.remove();

    // delete job from employer
    user.jobsPublished = user.jobsPublished.filter(
      ({ job }) => job.toString() !== req.params.id
    );

    await user.save();

    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route     PUT api/jobs/:id
// @desc      Update job by id
// @access    Private
router.put("/:id", [auth, checkObjectId("id")], async (req, res) => {
  const {
    title,
    description,
    jobUrl,
    jobRequirements,
    expNeeded,
    jobType,
    numberOfVacancies,
    salary,
    locationOfTheJob,
  } = req.body;

  // Build newjob object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (description) jobFields.description = description;
  if (jobUrl) jobFields.jobUrl = jobUrl;
  if (expNeeded) jobFields.expNeeded = expNeeded;
  if (jobType) jobFields.jobType = jobType;
  if (numberOfVacancies) jobFields.numberOfVacancies = numberOfVacancies;
  if (salary) jobFields.salary = salary;
  if (locationOfTheJob) jobFields.locationOfTheJob = locationOfTheJob;
  if (jobRequirements.length !== 0) jobFields.jobRequirements = jobRequirements;

  try {
    let job = await Job.findById(req.params.id);
    // let user = await User.findById(req.user.id);

    if (!job) {
      return res.status(401).json({ errors: [{ msg: "job not found" }] });
    }

    // Make sure user owns Job
    if (job.company.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: "user not authorized to edit the job" }] });
    }

    editedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(editedJob);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    POST api/jobs/apply/:id
// @desc     apply to a job
// @access   Private
router.post("/apply/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // check if it's a user or a company
    if (user.isCompany == true) {
      return res.status(401).json({
        errors: [{ msg: "an employer is not allowed to apply for a job" }],
      });
    }

    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "please create a user profile first" }] });
    }

    const job = await Job.findById(req.params.id);

    //check if there is a job in db
    if (!job) {
      return res.status(401).json({ errors: [{ msg: "job not found" }] });
    }

    //check if user already applied to the job
    if (
      job.applications.some(
        (application) => application.user.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: "you allready applied to the job" }] });
    }

    const newApplication = {
      user: req.user.id,
      name: user.name,
    };

    job.applications.push(newApplication);

    await job.save();

    const newJobAppliedTo = {
      job: req.params.id,
      application: job.applications[job.applications.length - 1].id,
      title: job.title,
      employerName: job.employerName,
      status: job.applications[job.applications.length - 1].status,
    };

    user.jobsAppliedTo.unshift(newJobAppliedTo);

    await user.save();

    res.json(user.jobsAppliedTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/jobs/unapply/:id/:application_id
// @desc     unapply for a job, in other words delete application for a job
// @access   Private
router.delete("/unapply/:id/:application_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(401).json({ msg: "job not found" });
    }

    // Pull out application
    const application = job.applications.find(
      (application) => application.id === req.params.application_id
    );
    // Make sure application exists
    if (!application) {
      return res.status(404).json({ msg: "application does not exist" });
    }
    // Check user
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // delete job from jobs user aplied to
    user.jobsAppliedTo = user.jobsAppliedTo.filter(
      (theJob) => theJob.job.toString() !== req.params.id
    );

    await user.save();

    // delete application
    job.applications = job.applications.filter(
      ({ id }) => id !== req.params.application_id
    );

    await job.save();

    res.json("application removed");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// @route    GET api/jobs/applications/:id
// @desc     Get all applications for a job by jobID
// @access   private
router.get(
  "/applications/:id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ msg: "job not found" });
      }

      if (job.company.toString() !== req.user.id) {
        return res.status(404).json({ errors: [{ msg: "not authorized" }] });
      }

      res.json(job.applications);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/jobs/:id/in_consideration/:application_id
// @desc      put an applicant in consideration
// @access    Private
router.put(
  "/:id/in_consideration/:application_id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      let job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(401).json({ errors: [{ msg: "job not found" }] });
      }

      // Make sure user owns Job
      if (job.company.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: "not authorized" }] });
      }

      const Application = job.applications.filter(
        (app) => app.id.toString() == req.params.application_id
      );

      let user = await User.findById(Application[0].user);

      user.jobsAppliedTo.map((application) => {
        if (application.application.toString() === req.params.application_id) {
          application.status = "In consideration";
        }
      });

      await user.save();

      job.applications.map((application) => {
        if (application._id.toString() === req.params.application_id) {
          application.status = "In consideration";
        }
        //  else {
        //   return res
        //     .status(401)
        //     .json({ errors: [{ msg: "application not found" }] });
        // }
      });

      const savedJob = await job.save();

      res.json(savedJob);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/jobs/:id/not_selected/:application_id
// @desc      not select an applicant
// @access    Private
router.put(
  "/:id/not_selected/:application_id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      let job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(401).json({ errors: [{ msg: "job not found" }] });
      }

      // Make sure user owns Job
      if (job.company.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "user not authorized to edit the job" });
      }

      const Application = job.applications.filter(
        (app) => app.id.toString() == req.params.application_id
      );

      let user = await User.findById(Application[0].user);

      user.jobsAppliedTo.map((application) => {
        if (application.application.toString() === req.params.application_id) {
          application.status = "not selected";
        }
      });

      await user.save();

      job.applications.map((application) => {
        if (application._id.toString() === req.params.application_id) {
          application.status = "not selected";
        }
        //  else {
        //   return res
        //     .status(401)
        //     .json({ errors: [{ msg: "application not found" }] });
        // }
      });

      const savedJob = await job.save();

      res.json(savedJob);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
