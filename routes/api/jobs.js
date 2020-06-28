const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const Job = require("../../models/Job");
const User = require("../../models/User");

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

      if (user.isCompany === false) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user not authorized to create a job" }] });
      }

      const { title, description, jobUrl, skills } = req.body;

      const newJob = new Job({
        title,
        description,
        jobUrl,
        skills,
        company: req.user.id,
      });

      const job = await newJob.save();

      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/jobs
// @desc     Get all jobs
// @access   Private
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });
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
      return res.status(404).json({ msg: "job not found" });
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
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "job not found" });
    }

    // Check user
    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await job.remove();

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
  const { title, description, jobUrl, skills } = req.body;

  // Build contact object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (description) jobFields.description = description;
  if (jobUrl) jobFields.jobUrl = jobUrl;
  if (skills.length !== 0) jobFields.skills = skills;

  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(401).json({ msg: "job not found" });
    }

    // Make sure user owns Job
    if (job.company.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "user not authorized to edit the job" });
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

module.exports = router;
