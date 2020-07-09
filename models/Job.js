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
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full time", "part time", "work from home"],
  },
  numberOfVacancies: {
    type: Number,
    required: true,
  },
  salary: {
    type: String,
  },
  locationOfTheJob: {
    type: String,
    required: true,
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
