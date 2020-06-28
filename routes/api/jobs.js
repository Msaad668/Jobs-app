const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Job = require("../../models/Job");
const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

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
        user: req.user.id,
      });

      const job = await newJob.save();

      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
