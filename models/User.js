const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCompany: {
    type: Boolean,
    default: false,
  },
  summary: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  jobsPublished: [
    {
      job: {
        type: Schema.Types.ObjectId,
      },
      title: {
        type: String,
      },
    },
  ],
  jobsAppliedTo: [
    {
      job: {
        type: Schema.Types.ObjectId,
      },
      application: {
        type: Schema.Types.ObjectId,
      },
      title: {
        type: String,
      },
      employerName: {
        type: String,
      },
      status: {
        type: String,
        enum: ["In consideration", "not selected", "no action yet"],
        default: "no action yet",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
