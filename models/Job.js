const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
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
  skills: {
    type: [String],
    required: true,
  },
  applications: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      isConsidered: {
        type: Boolean,
      },
      isViewed: {
        type: Boolean,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
