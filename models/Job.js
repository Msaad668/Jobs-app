const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  employerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobUrl: {
    type: String,
  },
  expNeeded: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["full time", "part time"],
  },
  numberOfVacancies: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  locationOfTheJob: {
    type: String,
  },

  // skillsNeeded: {
  //   type: [String],
  // },
  jobRequirements: {
    type: [String],
  },
  applications: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      status: {
        type: String,
        enum: ["In consideration", "not selected", "no action yet"],
        default: "no action yet",
      },
      // isViewed: {
      //   type: Boolean,
      // },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
