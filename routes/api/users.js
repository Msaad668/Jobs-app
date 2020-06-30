const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        isCompany: false,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

// @route    POST api/users/employer
// @desc     Register an employer
// @access   Public
router.post(
  "/employer",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        isCompany: true,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    get api/users/:id
// @desc     get user by id
// @access   private
// router.get("/:id", [auth, checkObjectId("id")], async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select(
//       "-jobsAppliedTo -password"
//     );

//     if (!user) {
//       return res.status(404).json({ msg: "user not found" });
//     }

//     if (user.id !== req.user.id) {
//       return res.status(404).json({ msg: "not authorized" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send("Server Error");
//   }
// });

// @route    get api/users/applications/:id
// @desc     get all applications of a user by userid
// @access   private
router.get(
  "/applications/:id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }

      if (user.isCompany) {
        return res.status(400).json({
          msg:
            "employer can not apply to jobs, so an employer has zero applications :)",
        });
      }

      if (user.id.toString() !== req.user.id) {
        return res.status(404).json({ msg: "user not authorized" });
      }

      res.json(user.jobsAppliedTo);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error");
    }
  }
);

// @route    get api/users/jobs/:id
// @desc     get all jobs posted by an employer by userId
// @access   private
router.get("/jobs/:id", checkObjectId("id"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.json(user.jobsPublished);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
